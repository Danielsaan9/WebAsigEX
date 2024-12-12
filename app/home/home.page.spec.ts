import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let routerMock: any;
  let usuarioServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    usuarioServiceMock = { validarUsuario: jasmine.createSpy('validarUsuario') };
    authServiceMock = { login: jasmine.createSpy('login') };

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que las propiedades "correo" y "contrasena" estén inicializadas como cadenas vacías
  it('debería inicializar correo y contrasena como cadenas vacías', () => {
    expect(component.correo).toBe('');
    expect(component.contrasena).toBe('');
  });

  // Verifica que se muestre un error si "correo" o "contrasena" están vacíos en el método login
  it('debería mostrar un error si correo o contrasena están vacíos en login()', () => {
    spyOn(window, 'alert');
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Por favor, inrese su usuario y contraseña.');
  });

  // Verifica que se llame a "validarUsuario" y se redirija a "menu2" si el usuario es un profesor
  it('debería llamar a validarUsuario y redirigir a menu2 si el usuario es un profesor', () => {
    const usuarioMock = { tipo: 'profesor' };
    usuarioServiceMock.validarUsuario.and.returnValue(of(usuarioMock));
    component.correo = 'test@correo.com';
    component.contrasena = 'password';
    component.login();
    expect(usuarioServiceMock.validarUsuario).toHaveBeenCalledWith('test@correo.com', 'password');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/menu2']);
  });

  // Verifica que se llame a "validarUsuario" y se redirija a "menu" si el usuario es un alumno
  it('debería llamar a validarUsuario y redirigir a menu si el usuario es un alumno', () => {
    const usuarioMock = { tipo: 'alumno' };
    usuarioServiceMock.validarUsuario.and.returnValue(of(usuarioMock));
    component.correo = 'test@correo.com';
    component.contrasena = 'password';
    component.login();
    expect(usuarioServiceMock.validarUsuario).toHaveBeenCalledWith('test@correo.com', 'password');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/menu']);
  });

  // Verifica que "mensajeError" se establezca si ocurre un error inesperado en login()
  it('debería establecer mensajeError si ocurre un error inesperado en login()', () => {
    const usuarioMock = null;
    usuarioServiceMock.validarUsuario.and.returnValue(of(usuarioMock));
    component.correo = 'test@correo.com';
    component.contrasena = 'password';
    component.login();
    expect(component.mensajeError).toBe('Ocurrió un error inesperado.');
  });

  // Verifica que "mensajeError" se reinicie después de 2 segundos
  it('debería reiniciar mensajeError después de 2 segundos', (done) => {
    const usuarioMock = null;
    usuarioServiceMock.validarUsuario.and.returnValue(of(usuarioMock));
    component.correo = 'test@correo.com';
    component.contrasena = 'password';
    component.login();
    setTimeout(() => {
      expect(component.mensajeError).toBeNull();
      done();
    }, 2000);
  });

  // Verifica que "restablecerVisible" sea verdadero al llamar a mostrarRestablecerContrasena()
  it('debería mostrar restablecerVisible como verdadero al llamar a mostrarRestablecerContrasena()', () => {
    component.mostrarRestablecerContrasena();
    expect(component.restablecerVisible).toBeTrue();
  });

  // Verifica que se muestre una alerta si correoRestablecer no es válido en enviarCorreo()
  it('debería mostrar una alerta si correoRestablecer no es válido en enviarCorreo()', () => {
    spyOn(window, 'alert');
    component.correoRestablecer = 'invalidemail.com';
    component.enviarCorreo();
    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico válido que contenga "@".');
  });

  // Verifica que se envíe un correo y se reinicien restablecerVisible y correoRestablecer en enviarCorreo()
  it('debería enviar un correo y reiniciar restablecerVisible y correoRestablecer en enviarCorreo()', () => {
    spyOn(window, 'alert');
    component.correoRestablecer = 'test@correo.com';
    component.enviarCorreo();
    expect(window.alert).toHaveBeenCalledWith('Se ha enviado un correo para restablecer su contraseña.');
    expect(component.restablecerVisible).toBeFalse();
    expect(component.correoRestablecer).toBe('');
  });

  // Verifica que se llame al método login y se navegue a "menu" cuando las credenciales son válidas
  it('debería llamar al método login y navegar a menu cuando las credenciales son válidas', () => {
    component.correo = 'test@example.com';
    component.contrasena = 'validPassword123';

    const usuarioMock = { correo: 'test@example.com', tipo: 'alumno' };
    usuarioServiceMock.validarUsuario.and.returnValue(of(usuarioMock));

    authServiceMock.login.and.callFake(() => {});

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(usuarioMock);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/menu']);
  });
});
