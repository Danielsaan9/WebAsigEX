import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importamos el módulo de pruebas para HttpClient
import { MisAsistenciasPage } from './mis-asistencias.page'; // Ajusta la ruta a tu componente
import { UsuarioService } from '../../services/usuario.service'; // Ajusta la ruta a tu servicio

describe('MisAsistenciasPage', () => {
  let component: MisAsistenciasPage;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Asegúrate de importar HttpClientTestingModule
      declarations: [MisAsistenciasPage],  // Declara tu componente
      providers: [UsuarioService]          // Proporciona el servicio que usa HttpClient
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component correctly', () => {
    expect(component).toBeTruthy();
  });
});
