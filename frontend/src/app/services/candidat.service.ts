import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // service global
})
export class CandidatService {

  private apiUrl = 'http://localhost:5000/api/candidats'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  // Récupérer la liste des candidats
  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Ajouter un candidat
  ajouterCandidat(candidat: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, candidat);
  }

  // Modifier un candidat
  modifierCandidat(id: string, candidat: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, candidat);
  }

  // Supprimer un candidat
  supprimerCandidat(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer un candidat par son id
  getCandidatParId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
