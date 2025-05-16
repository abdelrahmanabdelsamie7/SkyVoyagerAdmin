import { Component, DestroyRef, OnInit, signal } from '@angular/core';;
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { MessageService } from 'primeng/api';
// import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  // providers: [MessageService]
})
export class CategoryComponent { }
//  {
// categories = signal<Category[]>([]);
//   selectedCategory: Category | null = null;
//   isFetching = signal<boolean>(false);
//   modalTitle = signal<string>('إضافة قسم إخباري');
//   modalButton = signal<string>('حفظ');
//   addCategoryForm = new FormGroup({
//     title: new FormControl('', [Validators.required, Validators.maxLength(255)])
//   });
//   constructor(private _CategoryService: CategoryService, private _DestroyRef: DestroyRef, private _MessageService: MessageService) { }
//   ngOnInit(): void {
//     this.isFetching.set(true)
//     const subscription = this._CategoryService.listCategories().subscribe({
//       next: (resp: any) => {
//         this.categories.set(resp.data);
//         this.isFetching.set(false);
//       }
//     });
//     this._DestroyRef.onDestroy(() => {
//       subscription.unsubscribe();
//     });
//   }
//   openAddModal() {
//     this.selectedCategory = null;
//     this.modalTitle.set('إضافة قسم إخباري');
//     this.modalButton.set('حفظ');
//     this.addCategoryForm.reset();
//   }
//   openUpdateModal(category: Category) {
//     this.selectedCategory = category;
//     this.modalTitle.set('تعديل عنوان القسم');
//     this.modalButton.set('حفظ التعديلات');
//     this.addCategoryForm.patchValue({ title: category.title });
//   }
//   saveCategory() {
//     if (this.selectedCategory) {
//       const updatedCategory: Category = {
//         ...this.selectedCategory!,
//         ...this.addCategoryForm.value,
//         title: this.addCategoryForm.value.title || '',
//       };
//       this._CategoryService.updateCategory(this.selectedCategory.id, updatedCategory).subscribe({
//         next: (resp: any) => {
//           this._MessageService.add({
//             severity: 'success',
//             summary: 'تم بنجاح',
//             detail: 'تم تعديل بيانات القسم الإخباري بنجاح',
//             life: 1500
//           });
//           this.categories.update(categories =>
//             categories.map(cat => (cat.id === this.selectedCategory!.id ? resp.data : cat))
//           );
//           this.closeModal();
//         }
//       });
//     } else {
//       const newCategory: Category = {
//         id: '',
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//         title: this.addCategoryForm.value.title || '',
//       };
//       this._CategoryService.addCategory(newCategory).subscribe({
//         next: (resp: any) => {
//           this._MessageService.add({
//             severity: 'success',
//             summary: 'تم بنجاح',
//             detail: 'تم إضافة قسم إخباري بنجاح',
//             life: 1500
//           });
//           this.categories.update(categories => [...categories, resp.data]);
//           this.closeModal();
//         }
//       });
//     }
//   }
//   deleteCategory(id: string) {
//     this._CategoryService.deleteCategory(id).subscribe({
//       next: () => {
//         this._MessageService.add({
//           severity: 'success',
//           summary: 'تم بنجاح',
//           detail: 'تم مسح القسم الإخباري بنجاح',
//           life: 1500
//         });
//         this.categories.update(categories => categories.filter(category => category.id !== id));
//       }
//     });
//   }
//   closeModal() {
//     document.getElementById('closeModalButton')?.click();
//   }
// }
