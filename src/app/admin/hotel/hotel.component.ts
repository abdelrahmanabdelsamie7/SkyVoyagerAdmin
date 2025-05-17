import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hotel } from '../../core/interfaces/hotel';
import { HotelService } from '../../core/services/hotel.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { LoadingComponent } from "../shared/loading/loading.component";
import { EmptyComponent } from '../shared/empty/empty.component';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, LoadingComponent,EmptyComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
  providers: [MessageService]
})
export class HotelComponent implements OnInit {
  Hotels = signal<Hotel[]>([]);
  Hotel = signal<Hotel>({
    id: '',
    title: '',
    image_cover: undefined,
    price_per_night: 0,
    dinner_option: false,
    ac_option: false,
    hot_tub_option: false,
    num_of_beds: 0,
    description: '',
    location: ''
  });
  selectedHotel: Hotel | null = null;
  modalTitle = signal<string>('Add Hotel');
  modalButton = signal<string>('Save');
  HotelImage = signal<any>('');
  showImageWarning = signal<boolean>(false);
  isFetching = signal<boolean>(false);

  addHotelForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    image_cover: new FormControl<File | null>(null),
    price_per_night: new FormControl(0, [Validators.required, Validators.min(0)]),
    dinner_option: new FormControl(false),
    ac_option: new FormControl(false),
    hot_tub_option: new FormControl(false),
    num_of_beds: new FormControl(1, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  addHotelImages = new FormGroup({
    id: new FormControl('', Validators.required),
    image_cover: new FormControl<File[] | null>(null)
  });
  selectedHotelId: string | null = null;
  selectedFiles: File[] = [];

  constructor(
    private _HotelService: HotelService,
    private _DestroyRef: DestroyRef,
    private _MessageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._HotelService.listHotels().subscribe({
      next: (resp: any) => {
        this.Hotels.set(resp.data);
        this.isFetching.set(false);
      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openAddModal() {
    this.selectedHotel = null;
    this.modalTitle.set('Add Hotel');
    this.modalButton.set('Save');
    this.addHotelForm.reset();
    this.HotelImage.set(null);
  }
  openUpdateModal(Hotel: Hotel) {
    this.selectedHotel = Hotel;
    this.modalTitle.set('Update Hotel');
    this.modalButton.set('Save Changes');
    this.addHotelForm.patchValue({
      title: Hotel.title,
      image_cover: null,
      price_per_night: Hotel.price_per_night,
      dinner_option: Hotel.dinner_option,
      ac_option: Hotel.ac_option,
      hot_tub_option: Hotel.hot_tub_option,
      num_of_beds: Hotel.num_of_beds,
      description: Hotel.description,
      location: Hotel.location
    });
    this.HotelImage.set(Hotel.image_cover || null);
  }
  closeModal() {
    document.getElementById('closeModalButton')?.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addHotelForm.patchValue({ image_cover: input.files[0] });
    }
  }
  saveHotel() {
    const formData = new FormData();
    formData.append('title', this.addHotelForm.value.title || '');
    formData.append('price_per_night', String(this.addHotelForm.value.price_per_night ?? 0));
    formData.append('dinner_option', String(this.addHotelForm.value.dinner_option ?? false));
    formData.append('ac_option', String(this.addHotelForm.value.ac_option ?? false));
    formData.append('hot_tub_option', String(this.addHotelForm.value.hot_tub_option ?? false));
    formData.append('num_of_beds', String(this.addHotelForm.value.num_of_beds ?? 1));
    formData.append('description', this.addHotelForm.value.description || '');
    formData.append('location', this.addHotelForm.value.location || '');
    const file = this.addHotelForm.value.image_cover;
    if (file && file instanceof File) {
      formData.append('image_cover', file);
    }
    if (this.selectedHotel) {
      this._HotelService.editHotel(this.selectedHotel.id, formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Hotel Updated', life: 1500 });
          this.Hotels.set(this.Hotels().map(Hotel => Hotel.id === this.selectedHotel!.id ? resp.data : Hotel));
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
      this._HotelService.addHotel(formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Hotel Added', life: 1500 });
          this.Hotels.update(Hotels => [...Hotels, resp.data]);
          this.closeModal();
        },
        error: (err) => {

          console.log(err);
          if (err.error.message == 'The image field is required.') {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'You Should Add Image Cover Again', life: 1500 });
          } else {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'Make Sure Of Validated Data', life: 1500 });
          }
        }
      });
    }
  }
  deleteHotel(id: string) {
    this._HotelService.deleteHotel(id).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Hotel Deleted', life: 1500 });
        this.Hotels.update(Hotels => Hotels.filter(Hotel => Hotel.id !== id));
      }
    });
  }
}
