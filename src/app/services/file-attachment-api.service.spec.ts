import { TestBed } from '@angular/core/testing';

import { FileAttachmentAPIService } from './file-attachment-api.service';

describe('FileAttachmentAPIService', () => {
  let service: FileAttachmentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileAttachmentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
