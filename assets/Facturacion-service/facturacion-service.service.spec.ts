import { TestBed } from '@angular/core/testing';

import { FacturacionServiceService } from './facturacion-service.service';

describe('FacturacionServiceService', () => {
  let service: FacturacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
