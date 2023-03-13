import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { FormBuilder, FormGroup  } from '@angular/forms';

import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  search: String = '';
  
  productForm: FormGroup = this.fb.group({
    idProducto: [''],
    producto: [''],
    existenciaInicial: [''],
    existenciaActual: [''],
    precioActual: [''],    
  });
  
  constructor(
    private toastr: ToastrService,
    public fb: FormBuilder,
    private apiService: ApiServiceService
  ){}

  get filteredProductos(): Producto[] {
    return this.productos.filter(x => x.producto.toLowerCase().includes(this.search.toLowerCase()))
  }
  
  onSubmit() {
    this.apiService.createProducto(this.productForm.value).subscribe(res => {
      if(this.productForm.value.idProducto == ''){
        this.toastr.success('Producto agregado');
      }else{
        this.toastr.success('Producto actualizado');
      }

      this.productForm.reset();
      this.getData();
    });
  }

  getData(){
    this.apiService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  handlerDelete(id:number){
    var res = confirm("¿Está seguro que desea eliminar el producto?");
    if(res){
      this.apiService.deleteProducto(id).subscribe(res => {
        this.toastr.info('Producto eliminado');
        this.getData();
      })
    }
  }

  loadData(producto:Producto){
    this.productForm.setValue(producto);
  }

  resetData(){
    this.productForm.reset();
  }

  ngOnInit(){
    this.getData();
  }
}
