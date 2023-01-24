import { HttpClient, HttpHeaders } from '@angular/common/http';
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
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      )
  }

  userRegister(name:string, email: string, password: string){

    const url = `${this.baseUrl}/auth/new`
    const body = {name, email, password}

    return this.http.post<IAuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      )
  }

  validateToken(){
    const url = `${this.baseUrl}/auth/renew`
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
      .set('x-token', token || '')

    return this.http.get<IAuthResponse>(url, {headers})
      .pipe(map(resp => {

        localStorage.setItem('token', resp.token!)
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        }

        return resp.ok;
      }),
      catchError(err => of(false)))
  }

  logOut(){
    localStorage.clear();
  }

}


