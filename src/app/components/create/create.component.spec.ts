import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateComponent } from './create.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('CreateComponent', async () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let service: AuthService;
  //Crear un espia del router
  let mockNavigate = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: mockNavigate,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    component.loginFG = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    fixture.detectChanges();
    // Habilitamos en jasmine el re espiar las funciones , caso contrario tendriamos un error
    jasmine.getEnv().allowRespy(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validamos token luego de llamar login()', () => {
    const spyLogin = spyOn(service, 'auth').and.callThrough();

    // Seteamos nuestros valores en nuestro reactiveForm para la pruebas
    component.loginFG.controls.email.setValue('eve.holt@reqres.in');
    component.loginFG.controls.password.setValue('cityslicka');

    // Llamamos nuestra funcion a evaluar
    component.login();

    //Validamos que sea llamado nuestro espia
    expect(spyLogin).toHaveBeenCalled();

    const mockDataResponseLoginFirst = {
      token: 'QpwL5tke4Pnpja7X4',
    };
    const spyMock = spyOn(service, 'auth').and.callFake(() => {
      return of(mockDataResponseLoginFirst);
    });
    expect(spyMock).toHaveBeenCalled();
    component.login();
    expect(component.token).toEqual(mockDataResponseLoginFirst.token);
  });

  it('Validar estado inicial', () => {
    expect(component.token).toEqual('');
    expect(component.loginFG.valid).toEqual(false);
  });

  it('Debe redireccionar al home', () => {
    const spyOnRedirect = spyOn(component, 'redirect').and.callThrough(); //Para rastrear las llamadas que se hagan a ese metodo
    component.redirect();
    expect(mockNavigate.navigate).toHaveBeenCalledWith(['home']); //Verificar si navego correctamente a esa ruta
    expect(spyOnRedirect).toHaveBeenCalled(); //Verificar si se ha llamado al metodo
  });
});
