import { TestBed, inject } from '@angular/core/testing';

import { LaravelUserServiceService } from './laravel-user-service.service';

describe('LaravelUserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaravelUserServiceService]
    });
  });

  it('should ...', inject([LaravelUserServiceService], (service: LaravelUserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
