import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignationDto, DesignationModel } from '../models/DesignationModel';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7174/api/designation';

  getAllDesignation(): Observable<DesignationDto[]> {
    return this.http.get<DesignationDto[]>(`${this.baseUrl}/getall`);
  }

  addDesignation(designation: DesignationModel): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/add`, designation);
  }

  updateDesignation(designation: DesignationModel): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/update`, designation);
  }

  getDesignationById(id: number): Observable<{ data: DesignationModel }> {
    return this.http.get<{ data: DesignationModel }>(`${this.baseUrl}/${id}`);
  }

  getFilteredData(id?: number, search?: string): Observable<DesignationDto[]> {
    return this.http.get<DesignationDto[]>(
      `${this.baseUrl}/filter?departmentId=${id}&search=${search}`,
    );
  }

  deleteDesignation(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}`);
  }
}
