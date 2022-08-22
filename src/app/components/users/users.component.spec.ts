import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let servicio: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    servicio = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validamos data', () => {
    const responseMock = {
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://reqres.in/img/faces/7-image.jpg',
        },
        {
          id: 8,
          email: 'lindsay.ferguson@reqres.in',
          first_name: 'Lindsay',
          last_name: 'Ferguson',
          avatar: 'https://reqres.in/img/faces/8-image.jpg',
        },
        {
          id: 9,
          email: 'tobias.funke@reqres.in',
          first_name: 'Tobias',
          last_name: 'Funke',
          avatar: 'https://reqres.in/img/faces/9-image.jpg',
        },
        {
          id: 10,
          email: 'byron.fields@reqres.in',
          first_name: 'Byron',
          last_name: 'Fields',
          avatar: 'https://reqres.in/img/faces/10-image.jpg',
        },
        {
          id: 11,
          email: 'george.edwards@reqres.in',
          first_name: 'George',
          last_name: 'Edwards',
          avatar: 'https://reqres.in/img/faces/11-image.jpg',
        },
        {
          id: 12,
          email: 'rachel.howell@reqres.in',
          first_name: 'Rachel',
          last_name: 'Howell',
          avatar: 'https://reqres.in/img/faces/12-image.jpg',
        },
      ],
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
      },
    };

    // Espiamos nuestro servicio getUsers
    const spyGetUsers = spyOn(servicio, 'getUsersAPI').and.returnValue(
      of(responseMock)
    );

    component.getUsers();

    expect(spyGetUsers).toHaveBeenCalled();

    expect(component.totalUsers).toEqual(12);
  });

  it('Validar metodo clear', () => {
    component.clearArray();
    expect(component.arreglo.length).toEqual(0);
  });
});
