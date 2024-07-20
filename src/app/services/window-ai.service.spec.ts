import { TestBed } from '@angular/core/testing';

import { WindowAiService } from './window-ai.service';

describe('WindowAiService', () => {
  let service: WindowAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
