import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Header } from './header/header';
import { Dashboard } from './dashboard/dashboard';
import { Employee } from './employee/employee';
import { Employeelist } from './employeelist/employeelist';
import { Department } from './department/department';
import { Designation } from './designation/designation';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login

    },
    {
        path:'',
        component:Header,
        children:[
            {
                path:'dashboard',
                component:Dashboard
            },
            {
                path:'new-employee',
                component:Employee
            },
            {
                path:'employees',
                component:Employeelist
            },
            {
                path:'department',
                component:Department
            },
            {
                path:'designation',
                component:Designation
            }
        ]
    }
];
