/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateWorkoutService } from './update-workout.service';

describe('UpdateWorkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateWorkoutService]
    });
  });

  it('should ...', inject([UpdateWorkoutService], (service: UpdateWorkoutService) => {
    expect(service).toBeTruthy();
  }));
});
