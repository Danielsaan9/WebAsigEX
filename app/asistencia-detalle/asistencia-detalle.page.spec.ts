import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule

import { AsistenciaDetallePage } from './asistencia-detalle.page';
import { UsuarioService } from '../../services/usuario.service'; // Asegúrate de que el servicio está importado

describe('AsistenciaDetallePage', () => {
  let component: AsistenciaDetallePage;
  let fixture: ComponentFixture<AsistenciaDetallePage>;

  // Mock de ActivatedRoute
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => 'mockParam' } },
    params: of({ id: 'mockId' }) // Simula los parámetros de la ruta
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenciaDetallePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule // Añadir HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        UsuarioService // Asegúrate de que el servicio está en los proveedores
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});
