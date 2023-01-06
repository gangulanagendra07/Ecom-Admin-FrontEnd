import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any = [];
  constructor(private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err);
    })
  }

  DeleteCategory(id: any) {
    this.categoriesService.deleteCategory(id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      // timer(2000).toPromise().then((done) => {
      //   this.location.getState();
      // })
      window.location.reload();
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'category is not deleted' });
      })
  }
  UpadteCategory(id: any) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }

}
