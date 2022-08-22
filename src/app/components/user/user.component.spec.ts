import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { UserComponent } from './user.component';
const responseMock = {
  id: 2,
  email: 'janet.weaver@reqres.in',
  first_name: 'Janet',
  last_name: 'Weaver',
  avatar: 'https://reqres.in/img/faces/2-image.jpg',
};
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let activatedRouteSpy;
  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({
          id: '2',
        }),
      },
    };
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'getUserAPI',
    ]);
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    // Espiamos nuestro servicio getUsers
    const spyGetUser = authServiceSpy.getUserAPI.and.returnValue(
      of(responseMock)
    );

    fixture.detectChanges();

    expect(spyGetUser).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar que traiga un usuario', () => {
    // Espiamos nuestro servicio getUsers
    const spyGetUser = authServiceSpy.getUserAPI.and.returnValue(
      of(responseMock)
    );

    const idUser = 2;
    component.getUser(idUser);

    //Validamos que se haya llamado el Spy
    expect(spyGetUser).toHaveBeenCalled();

    expect(component.user).toEqual(responseMock);
  });
});
