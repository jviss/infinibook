import { TestBed } from '@angular/core/testing';

import { CardCommunicationService } from './card-communication.service';

describe('CardCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardCommunicationService = TestBed.get(CardCommunicationService);
    expect(service).toBeTruthy();
  });
});
