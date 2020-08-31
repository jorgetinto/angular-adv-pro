import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre:     ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    password:   ['', Validators.required],
    password2:  ['', Validators.required],
    terminos:   [false, Validators.required]
  }, {
    validators: this.passwordsiguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
           // mover al dashboard
           this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido(campo: string): boolean {
    return (this.registerForm.get(campo).invalid && this.formSubmitted) ? true : false;
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenaNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted ){
      return false;
    }else {
      return true;
    }
  }

  passwordsiguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
