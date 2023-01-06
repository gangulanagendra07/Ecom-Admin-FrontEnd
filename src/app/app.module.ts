import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './components/Authentication/auth.module';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AppComponent } from './app.component';

//PrimeNg Modules
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
// import { ScrollerModule } from 'primeng/scroller';
// import { VirtualScrollerModule } from 'primeng/virtualscroller';

//Services
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { TokenService } from './services/token.service';

//Components
import { ShellComponent } from './components/shell/shell.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';



const primeModules = [
  CardModule,
  ToolbarModule,
  ButtonModule, TableModule,
  StyleClassModule,
  InputTextModule,
  ToastModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
  // ScrollerModule,
  // VirtualScrollerModule
]

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    ProductFormComponent,
    ProductsListComponent,
    UsersListComponent,
    UserFormComponent,
    OrdersListComponent,
    OrdersDetailsComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...primeModules
  ],
  providers: [CategoriesService, ProductsService, UsersService, MessageService, ConfirmationService, TokenService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
