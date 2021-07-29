import { TestBed } from '@angular/core/testing';

import { RecipeComponentsComunicationService } from './recipe-components-comunication.service';

describe('RecipeComponentsComunicationService', () => {
  let service: RecipeComponentsComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeComponentsComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
