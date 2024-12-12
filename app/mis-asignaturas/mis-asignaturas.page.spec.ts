import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MisAsignaturasPage } from './mis-asignaturas.page';
import { UsuarioService } from '../../services/usuario.service'; // Si está en otro archivo

describe('MisAsignaturasPage', () => {
  let component: MisAsignaturasPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importamos el módulo de pruebas para HttpClient
      declarations: [MisAsignaturasPage],
      providers: [UsuarioService]  // Proveemos el servicio que usa HttpClient
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(MisAsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});
