import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FlightSchedule } from '../../../core/interfaces/flight-schedule';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { FlightScheduleService } from '../../../core/services/flight-schedule.service';
import { MessageService } from 'primeng/api';
import { OfferService } from '../../../core/services/offer.service';
import { Offer } from '../../../core/interfaces/offer';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { EmptyComponent } from "../../shared/empty/empty.component";

@Component({
  selector: 'app-flight-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, LoadingComponent, EmptyComponent],
  templateUrl: './flight-schedule.component.html',
  styleUrl: './flight-schedule.component.css',
  providers: [MessageService]
})
export class FlightScheduleComponent implements OnInit {
  FlightSchedules = signal<FlightSchedule[]>([]);
  Offers = signal<Offer[]>([]);
  FlightSchedule = signal<FlightSchedule>({
    id: '',
    offer_id: '',
    departure_city: '',
    departure_time: '',
    arrival_city: '',
    arrival_time: '',
    price_multiplier: 0,
    calculated_price: 0,
    offer : undefined
  });
  selectedFlightSchedule: FlightSchedule | null = null;
  modalTitle = signal<string>('Add Flight Schedule');
  modalButton = signal<string>('Save');
  isFetching = signal<boolean>(false);

  addFlightScheduleForm = new FormGroup({
    offer_id: new FormControl('', Validators.required),
    departure_city: new FormControl('', Validators.required),
    departure_time: new FormControl('', Validators.required),
    arrival_city: new FormControl('', Validators.required),
    arrival_time: new FormControl('', Validators.required),
    price_multiplier: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(
    private _FlightScheduleService: FlightScheduleService,
    private _OfferService: OfferService,
    private _DestroyRef: DestroyRef,
    private _MessageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._FlightScheduleService.listFlightSchedules().subscribe({
      next: (resp: any) => {
        this.FlightSchedules.set(resp.data);
        this.isFetching.set(false);
      }
    });
    this._OfferService.listOffers().subscribe({
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
    this.selectedFlightSchedule = null;
    this.modalTitle.set('Add Flight Schedule');
    this.modalButton.set('Save');
    this.addFlightScheduleForm.reset();
  }
  openUpdateModal(FlightSchedule: FlightSchedule) {
    this.selectedFlightSchedule = FlightSchedule;
    this.modalTitle.set('Update FlightSchedule');
    this.modalButton.set('Save Changes');
    this.addFlightScheduleForm.patchValue({
      offer_id: FlightSchedule.offer_id ?? '',
      departure_city: FlightSchedule.departure_city ?? '',
      departure_time: FlightSchedule.departure_time ?? '',
      arrival_city: FlightSchedule.arrival_city ?? '',
      arrival_time: FlightSchedule.arrival_time ?? '',
      price_multiplier: FlightSchedule.price_multiplier ?? 0
    });
  }
  closeModal() {
    document.getElementById('closeModalButton')?.click();
  }
  saveFlightSchedule() {
    const formData = new FormData();
    formData.append('offer_id', this.addFlightScheduleForm.get('offer_id')?.value ?? '');
    formData.append('departure_city', this.addFlightScheduleForm.get('departure_city')?.value ?? '');
    formData.append('departure_time', this.addFlightScheduleForm.get('departure_time')?.value ?? '');
    formData.append('arrival_city', this.addFlightScheduleForm.get('arrival_city')?.value ?? '');
    formData.append('arrival_time', this.addFlightScheduleForm.get('arrival_time')?.value ?? '');
    formData.append('price_multiplier', this.addFlightScheduleForm.get('price_multiplier')?.value?.toString() ?? '0');
    if (this.selectedFlightSchedule) {
      this._FlightScheduleService.editFlightSchedule(this.selectedFlightSchedule.id, formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'FlightSchedule Updated', life: 1500 });
          this.FlightSchedules.set(this.FlightSchedules().map(FlightSchedule => FlightSchedule.id === this.selectedFlightSchedule!.id ? resp.data : FlightSchedule));
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
      this._FlightScheduleService.addFlightSchedule(formData).subscribe({
        next: (resp: any) => {
          this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'FlightSchedule Added', life: 1500 });
          this.FlightSchedules.update(FlightSchedules => [...FlightSchedules, resp.data]);
          this.closeModal();
        },
        error: (err) => {
          (err);

          if (err.error.message == 'The image field is required.') {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'You Should Add Image Cover Again', life: 1500 });
          } else {
            this._MessageService.add({ severity: 'error', summary: 'Something Error', detail: 'Make Sure Of Validated Data', life: 1500 });
          }
        }
      });
    }
  }
  deleteFlightSchedule(id: string) {
    this._FlightScheduleService.deleteFlightSchedule(id).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'Done Successfully', detail: 'FlightSchedule Deleted', life: 1500 });
        this.FlightSchedules.update(FlightSchedules => FlightSchedules.filter(FlightSchedule => FlightSchedule.id !== id));
      }
    });
  }
}
