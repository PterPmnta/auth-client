import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAuthResponse, IUsuario } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: IUsuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    const url = `${this.baseUrl}/auth`
    const body = {email, password}

    return this.http.post<IAuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      )
  }
}
