import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../services/usuario.service'; // adjust the import to your file path
import { RevisarAsistenciasPage } from '../app/revisar-asistencias/revisar-asistencias.page'; // adjust to your component path

xdescribe('RevisarAsistenciasPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      declarations: [RevisarAsistenciasPage],
      providers: [UsuarioService] // Provide the necessary services
    }).compileComponents();
  });

  xit('should create the page', () => {
    const fixture = TestBed.createComponent(RevisarAsistenciasPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
