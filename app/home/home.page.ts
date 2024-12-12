import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../services/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';
  correoRestablecer: string = '';
  restablecerVisible: boolean = false; 
  mensajeError: string | null = null;

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService) {}
  ngOnInit() {
    this.correo = '';
    this.contrasena = '';
  }
  login() {
    if (!this.correo || !this.contrasena) {
      alert('Por favor, inrese su usuario y contraseña.');
      return;
    }
  
    this.usuarioService.validarUsuario(this.correo, this.contrasena).subscribe((usuario) => {
      if (usuario) {
        this.authService.login(usuario);
        this.mensajeError = '';
        
      
        if (usuario.tipo === 'profesor') {
          this.router.navigate(['/menu2']);
        } else if (usuario.tipo === 'alumno') {
          this.router.navigate(['/menu']);
        } else {
          this.mensajeError = 'Ocurrió un error inesperado.';
          setTimeout(() => {
            this.mensajeError = null;
          }, 2000);
        }
      } else {
        this.mensajeError = 'Ocurrió un error inesperado.';
        setTimeout(() => {
          this.mensajeError = null;
        }, 2000);
      }
    });
  }

  mostrarRestablecerContrasena() {
    this.restablecerVisible = true;
  }

  enviarCorreo() {
    
    if (!this.correoRestablecer.includes('@')) {
      alert('Por favor, ingresa un correo electrónico válido que contenga "@".');
      return;
    }

    
    console.log(`Correo enviado a: ${this.correoRestablecer}`);
    alert('Se ha enviado un correo para restablecer su contraseña.');
    this.restablecerVisible = false; 
    this.correoRestablecer = ''; 
  }
}
