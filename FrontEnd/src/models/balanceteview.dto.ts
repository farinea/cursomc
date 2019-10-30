import { BalanceteDTO } from "./balancete.dto";

export interface BalanceteViewDTO {
    categoria: String;
    tipoConta: String;
    jan?: number;
    fev?: number;
    mar?: number;
    abr?: number;
    mai?: number;
    jun?: number;
    jul?: number;
    ago?: number;
    set?: number;
    out?: number;
    nov?: number;
    dez?: number;
    total: number;
}


