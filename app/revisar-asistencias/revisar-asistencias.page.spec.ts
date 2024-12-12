import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RevisarAsistenciasPage } from './revisar-asistencias.page';
import { UsuarioService } from '../../services/usuario.service';

describe('RevisarAsistenciasPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevisarAsistenciasPage],
      imports: [HttpClientModule], // Importa HttpClientModule para habilitar HttpClient
      providers: [UsuarioService], // Asegúrate de incluir los servicios necesarios
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(RevisarAsistenciasPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
