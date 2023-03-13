import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producto } from '../models/producto';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  private baseURL:String = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getSexos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseURL}/catalogo/sexo`);
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.baseURL}/producto`);
  }

  createProducto(producto:Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.baseURL}/producto`, JSON.stringify(producto), this.httpOptions);
  }

  deleteProducto(id:number){
    return this.http.delete<Producto>(`${this.baseURL}/producto/${id}`, this.httpOptions);
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.baseURL}/cliente`);
  }

  createCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.baseURL}/cliente`, JSON.stringify(cliente), this.httpOptions);
  }

  deleteCliente(id:number){
    return this.http.delete<Cliente>(`${this.baseURL}/cliente/${id}`, this.httpOptions);
  }
}
