import { Component, OnInit, OnDestroy } from '@angular/core';

import {MedicoService} from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})

export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando = true;
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
                  .pipe(delay(100))
                  .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(resp => {
        this.medicos = resp;
        this.cargando = false;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( (resp: Medico[]) => {
          this.medicos = resp;
        });
  }

  borrarMedico(medico: Medico) {

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe(resp =>
          {
            this.cargarMedicos();

            Swal.fire(
              'medico borrado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );
        }
        );
      }
    });
  }

}
