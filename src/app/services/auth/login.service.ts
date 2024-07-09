import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLogin = this.api.getBaseUrl + "login";
  private apiLogout = this.api.getBaseUrl + "logout";

  constructor(private http: HttpClient, private api: ApiService) { }

  public login(data: any): Observable<any> {
    return this.http.post<Usuario>(this.apiLogin, JSON.stringify(data), this.api.getHttpOptions())
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public logout(): Observable<any> {
    return this.http.get<any>(this.apiLogout, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

}
