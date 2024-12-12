import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Asignatura } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://192.168.1.13:3001';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseUrl}/asignaturas`);
  }

  getAsignaturasInscritas(usuario: Usuario): Observable<Asignatura[]> {
    return this.getAsignaturas().pipe(
      map((asignaturas) =>
        asignaturas.filter((asignatura) => usuario.asignaturas_inscritas?.includes(asignatura.id))
      )
    );
  }

  getProfesorPorId(profesorId: string): Observable<Usuario | undefined> {
    return this.getUsuarios().pipe(
      map((usuarios) => usuarios.find(usuario => usuario.id === profesorId && usuario.tipo === 'profesor'))
    );
  }

  validarUsuario(correo: string, contrasena: string): Observable<Usuario | undefined> {
    return this.getUsuarios().pipe(
      map((usuarios) => usuarios.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena))
    );
  }
  
  getAsistencias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/asistencias`);
  }

  actualizarUsuario(usuario: any): Observable<any> {
    const url = `${this.baseUrl}/usuarios/${usuario.id}`;
    return this.http.put(url, usuario);
  }
  getAlumnosPorAsignatura(asignaturaId: string): Observable<any[]> {
    return this.getUsuarios().pipe(
      map((usuarios) => usuarios.filter(usuario => 
        usuario.tipo === 'alumno' && usuario.asignaturas_inscritas?.includes(asignaturaId)
      ))
    );
  }
  
  actualizarAsistencias(asistencia: any): Observable<any> {
    const url = `${this.baseUrl}/asistencias/${asistencia.id}`;
    return this.http.put(url, asistencia);
  }
  crearAsistencia(asistencia: any): Observable<any> {
    const url = `${this.baseUrl}/asistencias`;
    return this.http.post(url, asistencia);
  }
}
