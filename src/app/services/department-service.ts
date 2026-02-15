import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/DepartmentModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7174/api/department';


  getAllDepartments() : Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>(`${this.baseUrl}/getall`);
  }
  
  addDepartment(department: DepartmentModel) : Observable<{message:string}> {
    return this.http.post<{message:string}>(`${this.baseUrl}/add`, department);
  }

  updateDepartment(department : DepartmentModel) :Observable<{message:string}>{
    return this.http.put<{message:string}>(`${this.baseUrl}/update`,department)
  }

  getDepartmentById(id : number) : Observable<{data:DepartmentModel}>{
    return this.http.get<{data:DepartmentModel}>(`${this.baseUrl}/${id}`);
  }
  deleteDepartment(id : number) : Observable<{message:string}>{
    return this.http.delete<{message:string}>(`${this.baseUrl}/delete/${id}`);
  }
}
