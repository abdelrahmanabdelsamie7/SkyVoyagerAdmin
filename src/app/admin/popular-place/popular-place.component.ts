import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { PopularPlace } from '../../core/interfaces/popular-place';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { PopularPlaceService } from '../../core/services/popular-place.service';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from "../shared/loading/loading.component";
import { EmptyComponent } from "../shared/empty/empty.component";

@Component({
  selector: 'app-popular-place',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, LoadingComponent, EmptyComponent],
  templateUrl: './popular-place.component.html',
  styleUrl: './popular-place.component.css',
  providers: [MessageService]
})
export class PopularPlaceComponent implements OnInit {
  PopularPlaces = signal<PopularPlace[]>([]);
  PopularPlace = signal<PopularPlace>({
    id: '',
    title: '',
    image_cover: undefined,
    price_of_ticket: 0,
    best_season_to_visit: '',
    description: '',
    location: ''
  });
  selectedPopularPlace: PopularPlace | null = null;
  modalTitle = signal<string>('Add Popular Place');
  modalButton = signal<string>('Save');
  PopularPlaceImage = signal<any>('');
  showImageWarning = signal<boolean>(false);
  isFetching = signal<boolean>(false);

  addPopularPlaceForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    image_cover: new FormControl<File | null>(null),
    best_season_to_visit: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price_of_ticket: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  addPopularPlaceImages = new FormGroup({
    id: new FormControl('', Validators.required),
    image_cover: new FormControl<File[] | null>(null)
  });
  selectedPopularPlaceId: string | null = null;
  selectedFiles: File[] = [];

  constructor(
    private _PopularPlaceService: PopularPlaceService,
    private _DestroyRef: DestroyRef,
    private _MessageService: MessageService,
  ) { }
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._PopularPlaceService.listPopularPlaces().subscribe({
      next: (resp: any) => {
        this.PopularPlaces.set(resp.data);
        this.isFetching.set(false);
      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openAddModal() {
    this.selectedPopularPlace = null;
    this.modalTitle.set('Add Popular Place');
    this.modalButton.set('Save');
    this.addPopularPlaceForm.reset();
    this.PopularPlaceImage.set(null);
  }
  openUpdateModal(PopularPlace: PopularPlace) {
    this.selectedPopularPlace = PopularPlace;
    this.modalTitle.set('Update PopularPlace');
    this.modalButton.set('Save Changes');
    this.addPopularPlaceForm.patchValue({
      title: PopularPlace.title,
      image_cover: null,
      best_season_to_visit: PopularPlace.best_season_to_visit,
      price_of_ticket: PopularPlace.price_of_ticket,
      description: PopularPlace.description,
      location: PopularPlace.location,
    });
    this.PopularPlaceImage.set(PopularPlace.image_cover || null);
  }
  closeModal() {
    document.getElementById('closeModalButton')?.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addPopularPlaceForm.patchValue({ image_cover: input.files[0] });
    }
  }
  savePopularPlace() {
    const formData = new FormData();
    formData.append('title', this.addPopularPlaceForm.value.title || '');
    formData.append('best_season_to_visit', this.addPopularPlaceForm.value.best_season_to_visit || '');
    formData.append('price_of_ticket', String(this.addPopularPlaceForm.value.price_of_ticket ?? 0));
    formData.append('description', this.addPopularPlaceForm.value.description || '');
    formData.append('location', this.addPopularPlaceForm.value.location || '');
    const file = this.addPopularPlaceForm.value.image_cover;
    if (file && file instanceof File) {
      formData.append('image_cover', file);
    }
    if (this.selectedPopularPlace) {
      this._PopularPlaceService.editPopularPlace(this.selectedPopularPlace.id, formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Popular Place Updated', life: 1500 });
          this.PopularPlaces.set(this.PopularPlaces().map(PopularPlace => PopularPlace.id === this.selectedPopularPlace!.id ? resp.data : PopularPlace));
          this.closeModal();
        },
        error: (err) => {
          if (err.error.message == 'The image field is required.') {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'You Should Add Image Cover Again', life: 1500 });
          } else {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'Make Sure Of Validated Data', life: 1500 });
          }
        }
      });
    } else {
      this._PopularPlaceService.addPopularPlace(formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Popular Place Added', life: 1500 });
          this.PopularPlaces.update(PopularPlaces => [...PopularPlaces, resp.data]);
          this.closeModal();
        },
        error: (err) => {
          if (err.error.message == 'The image field is required.') {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'You Should Add Image Cover Again', life: 1500 });
          } else {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'Make Sure Of Validated Data', life: 1500 });
          }
        }
      });
    }
  }
  deletePopularPlace(id: string) {
    this._PopularPlaceService.deletePopularPlace(id).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Popular Place Deleted', life: 1500 });
        this.PopularPlaces.update(PopularPlaces => PopularPlaces.filter(PopularPlace => PopularPlace.id !== id));
      }
    });
  }
}
