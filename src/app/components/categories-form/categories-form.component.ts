import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  editMode: Boolean = false;
  categoryId: any;


  constructor(private fb: FormBuilder, private messageService: MessageService, private categorieService: CategoriesService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })
    this.checkEditMode();
  }

  onCreate() {
    console.log(this.getFormData['color'].value)
    let formData = {
      name: this.getFormData['name'].value,
      icon: this.getFormData['icon'].value,
      color: this.getFormData['color'].value
    }
    if (this.editMode) {
      this.categorieService.updateCategory(this.categoryId, formData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'category is updated' });
        timer(2000).toPromise().then((done) => {
          this.location.back();
        })
        this.form.reset();
        // console.log(data)
      }, err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'category is not updated' });
      })
    } else {
      this.categorieService.addCategory(formData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'category is created' });
        timer(2000).toPromise().then((done) => {
          this.location.back();
        })
        this.form.reset();
        // console.log(data)
      }, err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'category is not created' });
      })
    }

  }
  get getFormData() {
    return this.form.controls;
  }
  checkEditMode() {
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.editMode = true;
        this.categoryId = param['id'];
        this.categorieService.getCategory(param['id']).subscribe(category => {
          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
          this.form.controls['color'].setValue(category.color);
        }, err => {
          console.log(err);
        })
      }
    })
  }

}
