import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-asistencia-detalle',
  templateUrl: './asistencia-detalle.page.html',
  styleUrls: ['./asistencia-detalle.page.scss']
})
export class AsistenciaDetallePage implements OnInit {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  asignaturaId: string = '';
  asignaturaNombre: string = 'Detalle de Asistencias';
  asistencias: { fecha: string; estado: string }[] = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUser();
    this.asignaturaId = this.route.snapshot.paramMap.get('id') || '';

    if (usuario && usuario.tipo === 'alumno') {
      this.usuarioService.getAsignaturas().subscribe((asignaturas) => {
        const asignatura = asignaturas.find((a) => a.id === this.asignaturaId);
        if (asignatura) {
          this.asignaturaNombre = asignatura.nombre;
          this.titleService.setTitle(this.asignaturaNombre);
        }
      });

      this.usuarioService.getAsistencias().subscribe((asistencias) => {
        this.asistencias = asistencias
          .filter(
            (asistencia) =>
              asistencia.alumno_id === usuario.id &&
              asistencia.asignatura_id === this.asignaturaId
          )
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      });
    } else {
      console.warn('No hay usuario autenticado, o el usuario no es un alumno.');
    }
  }
}