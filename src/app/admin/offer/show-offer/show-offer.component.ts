import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { OfferService } from '../../../core/services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../../core/interfaces/offer';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from "../../shared/empty/empty.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { OfferImage } from '../../../core/interfaces/offer-image';

@Component({
  selector: 'app-show-offer',
  standalone: true,
  imports: [CommonModule, EmptyComponent, ReactiveFormsModule, Toast],
  templateUrl: './show-offer.component.html',
  styleUrl: './show-offer.component.css',
  providers: [MessageService]
})
export class ShowOfferComponent implements OnInit {
  id = signal<string>('')
  offer = signal<Offer>(
    {
      id: '',
      title: '',
      num_of_tickets: 0,
      from_date: '',
      to_date: '',
      city: '',
      price_per_ticket: 0,
      description: '',
      terms_and_conditions: '',
      created_at: '',
      updated_at: '',
      flight_schedules: undefined
    }
  )
  offerImages = signal<OfferImage[]>([])
  selectedFiles: File[] = [];
  addOfferImages = new FormGroup({
    offer_id: new FormControl(this.id()),
    images: new FormControl<File[] | null>(null)
  });
  constructor(private _OfferService: OfferService, private _ActivatedRoute: ActivatedRoute, private _DestroyRef: DestroyRef, private _MessageService: MessageService) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id.set(`${params.get('id')}`)
        const offerSubscription = this._OfferService.showOffer(this.id()).subscribe({
          next: (data: any) => {
            this.offer.set(data.data);
            this.offerImages.set(this.offer().images ?? []);
          }
        });

        this._DestroyRef.onDestroy(() => {
          offerSubscription.unsubscribe();
        });
      }
    })
  }
  onFileSelectedForImages(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }
  addOfferImage() {
    if (this.addOfferImages.invalid) {
      this._MessageService.add({ severity: 'warn', summary: 'Warning', detail: 'You Should Choice At Least One Image' });
      return;
    }
    const formData = new FormData();
    formData.append('offer_id', this.id()!);
    this.selectedFiles.forEach(file => formData.append('images[]', file));
    this._OfferService.addImageOffer(formData).subscribe({
      next: (res: any) => {
        this.offerImages.update(Offers => [...Offers, res.data]);

        this.closeModal();
        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Image Added To Offer' });
        this.addOfferImages.reset();
        this.selectedFiles = [];
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'Error When Upload Image' });
      }
    });
  }
  deleteOfferImage(imageId: string) {
    if (!confirm('Are You Sure Want To Delete Image')) return;
    this._OfferService.deleteImageOffer(imageId).subscribe({
      next: () => {

        const currentOffer = this.offer();
        const updatedOffer = {
          ...currentOffer,
          images: (currentOffer.images ?? []).filter((img: any) => img.id !== imageId)
        };
        this.offer.set(updatedOffer);

        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Image Deleted Successfully' });
        this.offerImages.update(offerImages => offerImages.filter(offerImage => offerImage.id !== imageId));
      }
    });
  }
  closeModal() {
    document.getElementById('closeModalButton')?.click();
  }
}
