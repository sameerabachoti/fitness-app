/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutsService]
    });
  });

  it('should ...', inject([WorkoutsService], (service: WorkoutsService) => {
    expect(service).toBeTruthy();
  }));
});
