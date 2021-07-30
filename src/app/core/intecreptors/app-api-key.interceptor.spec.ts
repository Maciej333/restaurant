import { TestBed } from '@angular/core/testing';

import { AppApiKeyInterceptor } from './app-api-key.interceptor';

describe('AppApiKeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppApiKeyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppApiKeyInterceptor = TestBed.inject(AppApiKeyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
