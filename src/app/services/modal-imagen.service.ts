import { Injectable, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private ocultarM = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this.ocultarM;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'
  ) {
    this.ocultarM = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this.ocultarM = true;
  }

  constructor() { }
}
