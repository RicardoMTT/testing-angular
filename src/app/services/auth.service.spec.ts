import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia retornar un usuario', (doneFn) => {
    const mockData = {
      data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      },
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
      },
    };

    service.getUserAPI(2).subscribe((data) => {
      expect(data).toEqual(mockData);
      doneFn();
    });

    const req = httpController.expectOne(`https://reqres.in/api/users/2`); //Cuando encuentre que se esta haciendo una peticion a una url en especifica, reemplaze ese por el mockData,aca le pasamos la url
    req.flush(mockData);
    httpController.verify(); //Verificar que se llamo
  });
});
