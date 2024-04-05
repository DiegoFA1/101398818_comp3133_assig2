import { Routes } from '@angular/router';
import { EmployeeAddUpdateComponent } from './employee-add-update/employee-add-update.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { guardUserGuard } from './guard-user.guard';

export const routes: Routes = [
    { path: 'login', component: UserLoginComponent},
    { path: 'register', component: UserRegisterComponent},
    { path: 'employee-list', component: EmployeeListComponent, canActivate: [guardUserGuard]},
    { path: 'employee-add-update', component: EmployeeAddUpdateComponent, canActivate: [guardUserGuard]},
    { path: 'employee-details', component: EmployeeDetailsComponent, canActivate: [guardUserGuard]},
    { path: '**', redirectTo: '/login'},
];
