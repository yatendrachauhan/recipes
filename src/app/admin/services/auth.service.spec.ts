import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../interfaces/login-form.interface';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // it('should call the authenticate API and return an observable of the User type', () => {
  //   // Arrange
  //   const testUser = {
  //     id: 1,
  //     username: 'test',
  //     email: 'test@example.com',
  //     token: 'token',
  //   };
  //   const mockResponse = { user: testUser };

  //   // Act
  //   authService.authenticate('test', 'password').subscribe((response) => {
  //     // Assert
  //     expect(response).toEqual(testUser);
  //   });

  //   const req = httpTestingController.expectOne(
  //     `${environment.apiUrl}/authenticate`
  //   );
  //   expect(req.request.method).toEqual('POST');
  //   req.flush(mockResponse);
  // });

  // it('should return an error if the API call fails', () => {
  //   // Arrange
  //   const error = 'Error: Something went wrong';

  //   // Act
  //   authService.authenticate('test', 'password').subscribe(
  //     (response) => fail('Expected an error, but got a response'),
  //     (err) => expect(err).toEqual(error)
  //   );

  //   const req = httpTestingController.expectOne(
  //     `${environment.apiUrl}/authenticate`
  //   );
  //   req.flush(error, { status: 500, statusText: 'Server Error' });
  // });
});
