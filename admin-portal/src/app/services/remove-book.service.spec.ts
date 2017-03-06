/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveBookService } from './remove-book.service';

describe('RemoveBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveBookService]
    });
  });

  it('should ...', inject([RemoveBookService], (service: RemoveBookService) => {
    expect(service).toBeTruthy();
  }));
});
