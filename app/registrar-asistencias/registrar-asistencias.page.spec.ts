import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RegistrarAsistenciasPage } from './registrar-asistencias.page'; // Ajusta la ruta si es necesario
import { UsuarioService } from '../../services/usuario.service'; // Ajusta la ruta si es necesario

describe('RegistrarAsistenciasPage', () => {
  let component: RegistrarAsistenciasPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importamos el módulo de pruebas para HttpClient
      declarations: [RegistrarAsistenciasPage],
      providers: [UsuarioService]  // Proveemos el servicio que usa HttpClient
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(RegistrarAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});
