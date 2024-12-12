import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarClavePage } from './cambiar-clave.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('CambiarClavePage', () => {
  let component: CambiarClavePage;
  let fixture: ComponentFixture<CambiarClavePage>;
  let routerMock: any;
  let alertControllerMock: any;
  let usuarioServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy('present'),
          onDidDismiss: jasmine.createSpy('onDidDismiss'),
        })
      ),
    };
    usuarioServiceMock = {
      actualizarUsuario: jasmine.createSpy('actualizarUsuario').and.returnValue(of(null)),
    };
    authServiceMock = {
      getUser: jasmine.createSpy('getUser').and.returnValue({ correo: 'test@correo.com', contrasena: 'oldpassword' }),
    };

    await TestBed.configureTestingModule({
      declarations: [CambiarClavePage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que esValidaContrasena() devuelva falso si la contraseña no cumple los criterios
  it('debería devolver falso en esValidaContrasena() si la contraseña no cumple los criterios', () => {
    expect(component.esValidaContrasena('password')).toBeFalse(); // Contraseña sin mayúsculas ni números
    expect(component.esValidaContrasena('Password1')).toBeTrue(); // Contraseña válida
  });

  // Verifica que puedeCambiarContrasena() devuelva verdadero si las contraseñas coinciden y son válidas
  it('debería devolver verdadero en puedeCambiarContrasena() si las contraseñas coinciden y son válidas', () => {
    component.nuevaContrasena = 'NewPassword1';
    component.repetirContrasena = 'NewPassword1';
    expect(component.puedeCambiarContrasena()).toBeTrue();
  });

  // Verifica que puedeCambiarContrasena() devuelva falso si las contraseñas no coinciden
  it('debería devolver falso en puedeCambiarContrasena() si las contraseñas no coinciden', () => {
    component.nuevaContrasena = 'NewPassword1';
    component.repetirContrasena = 'DifferentPassword';
    expect(component.puedeCambiarContrasena()).toBeFalse();
  });

  // Verifica que se muestre una alerta si la contraseña actual es incorrecta en cambiarContrasena()
  it('debería mostrar una alerta si la contraseña actual es incorrecta en cambiarContrasena()', async () => {
    component.correo = 'test@correo.com';
    component.contrasenaActual = 'wrongpassword';
    component.nuevaContrasena = 'NewPassword1';
    component.repetirContrasena = 'NewPassword1';
    await component.cambiarContrasena();
    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'La contraseña actual no es correcta.',
      buttons: ['OK'],
    });
  });
});
