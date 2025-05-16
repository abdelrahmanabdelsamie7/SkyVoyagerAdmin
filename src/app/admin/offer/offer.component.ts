import { MessageService } from 'primeng/api';
import { Component, DestroyRef, OnDestroy, OnInit, signal } from '@angular/core';
import { Offer } from '../../core/interfaces/offer';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from '../../core/services/offer.service';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
  providers: [MessageService]
})
export class OfferComponent implements OnInit {
  Offers = signal<Offer[]>([]);
  Offer = signal<Offer>({
    id: '',
    title: '',
    image_cover: undefined,
    num_of_tickets: 0,
    from_date: '',
    to_date: '',
    city: '',
    updated_at: '',
    price_per_ticket: 0,
    description: '',
    terms_and_conditions: '',
    created_at: ''
  });
  selectedOffer: Offer | null = null;
  modalTitle = signal<string>('Add Offer');
  modalButton = signal<string>('Save');
  OfferImage = signal<any>('');
  showImageWarning = signal<boolean>(false);
  isFetching = signal<boolean>(false);

  addOfferForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    image_cover: new FormControl<File | null>(null),
    num_of_tickets: new FormControl(0, [Validators.required, Validators.min(1)]),
    from_date: new FormControl('', Validators.required),
    to_date: new FormControl('', Validators.required),
    city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price_per_ticket: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    terms_and_conditions: new FormControl('', [Validators.required])
  });

  addOfferImages = new FormGroup({
    Offer_id: new FormControl('', Validators.required),
    image_cover: new FormControl<File[] | null>(null)
  });
  selectedOfferId: string | null = null;
  selectedFiles: File[] = [];

  constructor(
    private _OfferService: OfferService,
    private _DestroyRef: DestroyRef,
    private _MessageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._OfferService.listOffers().subscribe({
      next: (resp: any) => {
        this.Offers.set(resp.data);
        this.isFetching.set(false);
      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openAddModal() {
    this.selectedOffer = null;
    this.modalTitle.set('Add Offer');
    this.modalButton.set('Save');
    this.addOfferForm.reset();
    this.OfferImage.set(null);
  }
  openUpdateModal(Offer: Offer) {
    this.selectedOffer = Offer;
    this.modalTitle.set('Update Offer');
    this.modalButton.set('Save Changes');
    this.addOfferForm.patchValue({
      title: Offer.title,
      image_cover: null,
      num_of_tickets: Offer.num_of_tickets,
      from_date: Offer.from_date,
      to_date: Offer.to_date,
      city: Offer.city,
      price_per_ticket: Offer.price_per_ticket,
      description: Offer.description,
      terms_and_conditions: Offer.terms_and_conditions
    });
    this.OfferImage.set(Offer.image_cover || null);
  }
  closeModal() {
    document.getElementById('closeModalButton')?.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addOfferForm.patchValue({ image_cover: input.files[0] });
    }
  }
  saveOffer() {
    const formData = new FormData();
    formData.append('title', this.addOfferForm.value.title || '');
    formData.append('num_of_tickets', String(this.addOfferForm.value.num_of_tickets ?? 0));
    formData.append('from_date', this.addOfferForm.value.from_date || '');
    formData.append('to_date', this.addOfferForm.value.to_date || '');
    formData.append('city', this.addOfferForm.value.city || '');
    formData.append('price_per_ticket', String(this.addOfferForm.value.price_per_ticket ?? 0));
    formData.append('description', this.addOfferForm.value.description || '');
    formData.append('terms_and_conditions', this.addOfferForm.value.terms_and_conditions || '');
    const file = this.addOfferForm.value.image_cover;
    if (file && file instanceof File) {
      formData.append('image_cover', file);
    }
    if (this.selectedOffer) {
      this._OfferService.editOffer(this.selectedOffer.id, formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Offer Updated', life: 1500 });
          this.Offers.set(this.Offers().map(Offer => Offer.id === this.selectedOffer!.id ? resp.data : Offer));
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
      this._OfferService.addOffer(formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Offer Added', life: 1500 });
          this.Offers.update(Offers => [...Offers, resp.data]);
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
  deleteOffer(id: string) {
    this._OfferService.deleteOffer(id).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'Offer Deleted', life: 1500 });
        this.Offers.update(Offers => Offers.filter(Offer => Offer.id !== id));
      }
    });
  }
}
