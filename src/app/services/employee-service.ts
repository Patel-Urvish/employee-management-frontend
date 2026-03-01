import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeDtoModel, EmployeeModel } from '../models/EmployeeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

   private http = inject(HttpClient);
   private baseUrl = 'https://localhost:7174/api/employee';

   getAllEmployee()  : Observable<EmployeeDtoModel[]>{
    return this.http.get<EmployeeDtoModel[]>(`${this.baseUrl}/getall`);

   }

   saveEmployee(employee : EmployeeModel)  : Observable<{message :string}>{
    return this.http.post<{message :string}>(`${this.baseUrl}/add`,employee);
   }

   updateEmployee(employee : EmployeeModel)  : Observable<{message :string}>{
    return this.http.put<{message :string}>(`${this.baseUrl}/update`,employee);
   }

   getEmployeeById(id : number) : Observable<EmployeeModel>{
    return this.http.get<EmployeeModel>(`${this.baseUrl}/${id}`);
   }

   deleteEmployee(id : number) : Observable<{message :string}>{
    return this.http.delete<{message :string}>(`${this.baseUrl}/delete/${id}`);
   }
  
}
