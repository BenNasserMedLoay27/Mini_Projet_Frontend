import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universite } from '../model/universite.model';
import { Systeme } from '../model/systeme.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UniversiteService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  listeUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(this.apiURL);
  }

  ajouterUniversite(universite: Universite): Observable<Universite> {
    const universiteAEnvoyer = { ...universite };
    delete (universiteAEnvoyer as Partial<Universite>).idUniversite;
    return this.http.post<Universite>(this.apiURL, universiteAEnvoyer, httpOptions);
  }

  supprimerUniversite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, httpOptions);
  }

  consulterUniversite(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.apiURL}/${id}`);
  }

  updateUniversite(universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(this.apiURL, universite, httpOptions);
  }

  listeSystemes(): Observable<Systeme[]> {
    return this.http.get<Systeme[]>(`${this.apiURL}/sys`);
  }

  consulterSysteme(id: number): Observable<Systeme> {
    return this.http.get<Systeme>(`${this.apiURL}/sys/${id}`);
  }

  listeUniversitesParSysteme(idSysteme: number): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiURL}/prodscat/${idSysteme}`);
  }
}
