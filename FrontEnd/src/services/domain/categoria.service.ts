import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { CategoriaDTO } from "../../models/categoria.dto";
import { API_CONFIG } from 'src/config/api.config';
import { Observable, throwError } from 'rxjs';
import { StorageService } from "../storage.service";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CategoriaService {
    
    constructor(public http: HttpClient, public storage: StorageService) {

    }

    auth = 'Bearer ' + this.storage.getLocalUser().token;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.auth
        })
    };

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    find(id: string) : Observable<CategoriaDTO> {
        return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/categorias/${id}`);
    }

    findByTipo(tipo: string) : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/tipo/${tipo}`);
    }

    update(obj : CategoriaDTO) : Observable<CategoriaDTO> {
        console.log(obj);
        return this.http.put(
            `${API_CONFIG.baseUrl}/categorias/${obj.id}`, 
            obj,this.httpOptions).pipe(
                catchError(this.handleError),
                map(() => obj)
              );
    }

    insert(obj : CategoriaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/categorias`, 
            obj,this.httpOptions).pipe(
                catchError(this.handleError),
                map(() => obj)
              );
    }

    // private methods

    private handleError(error: any): Observable<any> {

        console.log("Erro na requisição =>", error);
        return throwError(error);
      }
    

}