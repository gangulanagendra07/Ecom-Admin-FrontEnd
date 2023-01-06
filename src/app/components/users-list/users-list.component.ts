import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any = [];
  isDelete: Boolean = false;
  confirmTure: boolean = false;
  constructor(private usersService: UsersService, private messageService: MessageService, private router: Router, private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  private GetAllUsers() {
    this.usersService.getAllUsers().subscribe(results => {
      this.users = results;
      console.log(results);
    }, err => {
      console.log(err);
    })
  }

  DeleteUser(id: any) {
    this.isDelete = true;
    this.confirmTure = true;
    this.confirmService.confirm({
      // target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDelete = false;
        this.usersService.deleteUser(id).subscribe(data => {
          this.GetAllUsers();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfuly' });
        })
      },
      reject: () => {
        this.isDelete = false;
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });

  }
  UpdateUser(id: any) {
    this.router.navigateByUrl(`users/form/${id}`);
  }
  GetCountryName(countryKey: string) {
    return this.usersService.getCountry(countryKey);
  }
}
