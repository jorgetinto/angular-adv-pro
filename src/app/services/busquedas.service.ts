import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.modal';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return  {
      headers: {
        'x-token': this.token
      }
    };
  }

  private trasformarUsuarios(resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  private transformarHospitales( resultados: any[] ): Hospital[] {
    return resultados;
  }

  private transformarMedicos( resultados: any[] ): Medico[] {
    return resultados;
  }

  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string
  ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map(
                  (resp: any ) => {

                    switch (tipo) {

                      case 'usuarios':
                        return this.trasformarUsuarios(resp.data);
                      case 'hospitales':
                        return this.transformarHospitales( resp.data );
                      case 'medicos':
                          return this.transformarMedicos( resp.data );
                      default:
                        return [];
                    }

                  }
                )
            );

  }

  busquedaGlobal(termino: string) {
    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get<any[]>( url, this.headers );
  }
}
