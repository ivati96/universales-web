import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { FormBuilder, FormGroup  } from '@angular/forms';

import { Cliente } from '../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  sexos: any[] = [];
  search: String = '';

  clienteForm: FormGroup = this.fb.group({
    idCliente: [''],
    nombre1: [''],
    nombre2: [''],
    apellido1: [''],
    apellido2: [''],
    sexo: [''],
    nit: [''],
  });
  
  constructor(
    private toastr: ToastrService,
    public fb: FormBuilder,
    private apiService: ApiServiceService
  ){}

  get filteredClientes(): Cliente[] {
    if(this.search == ''){
      return this.clientes;
    }

    return this.clientes.filter(x => this.concatenarNombre(x.nombre1, x.nombre2, x.apellido1, x.apellido2).toLowerCase().includes(this.search.toLowerCase()) || 
                                    x.nit.toLowerCase().includes(this.search.toLowerCase()) ||
                                    x.sexo.toLowerCase().includes(this.search.toLowerCase()));
  }

  concatenarNombre(nombre1:String, nombre2:String, apellido1:String, apellido2:String){
    var nombres = '';
    if(nombre1){
      nombres += nombre1 + ' ';
    }

    if(nombre2){
      nombres += nombre2 + ' ';
    }

    if(apellido1){
      nombres += apellido1 + ' ';
    }

    if(apellido2){
      nombres += apellido2 + ' ';
    }

    return nombres.replace(/ {2,}/g, " ").slice(0, -1);
  }
  
  onSubmit() {
    this.apiService.createCliente(this.clienteForm.value).subscribe(res => {
      if(this.clienteForm.value.idCliente == ''){
        this.toastr.success('Cliente agregado');
      }else{
        this.toastr.success('Cliente actualizado');
      }

      this.clienteForm.reset();
      this.getData();
    });
  }

  getData(){
    this.apiService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });

    this.apiService.getSexos().subscribe(data => {
      this.sexos = data
    })
  }

  handlerDelete(id:number){
    var res = confirm("¿Está seguro que desea eliminar el cliente?");
    if(res){
      this.apiService.deleteCliente(id).subscribe(res => {
        this.toastr.info('Cliente eliminado');
        this.getData();
      })
    }
  }

  loadData(cliente:Cliente){
    this.clienteForm.setValue(cliente);
  }

  resetData(){
    this.clienteForm.reset();
  }

  ngOnInit(){
    this.getData();
  }
}
