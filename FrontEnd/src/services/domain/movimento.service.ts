import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { MovimentoDTO } from 'src/models/movimento.dto';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class MovimentoService {

    constructor(public http: HttpClient) {
    }

    find(id: string) : Observable<MovimentoDTO> {
        return this.http.get<MovimentoDTO>(`${API_CONFIG.baseUrl}/movimento/${id}`);
    }
    
    insert(obj : MovimentoDTO) {
        console.log(obj.data);
        obj.data = formatDate(obj.data,"dd/MM/yyyy","en-US");
        console.log(obj.data);
        return this.http.post(
            `${API_CONFIG.baseUrl}/movimento`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
} 