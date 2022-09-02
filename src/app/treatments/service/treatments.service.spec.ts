import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { TreatmentsService } from './treatments.service';
import { tap, shareReplay } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

describe('TreatmentsService', () => {
  let service: TreatmentsService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  const mockTreatments = [
    {
      "treatmentCode": "AAA131",
      "patient": "Lakshmi Sonja",
      "treatmentDate": "2021-08-31T07:19:53"
    },
    {
      "treatmentCode": "AA13134BA",
      "patient": "Judith Militsa",
      "treatmentDate": "2021-08-05T15:19:53"
    },
  ];
  const mockSearchTreatments = [
    {
      "treatmentCode": "AAA131",
      "patient": "Lakshmi Sonja",
      "treatmentDate": "2021-08-31T07:19:53"
    }
  ];
  const mockSuccessResponse = '200';
  const mockParamValues = { treatmentCode: 'AAA131' };
  const dummyParams = new HttpParams().set('treatmentCode', 'AAA131');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TreatmentsService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should hit the json-server endpoint and get treatments data', (done) => {
    service.fetchTreatments().subscribe(
      (resp) => {
        expect(mockSuccessResponse).toEqual('200');
        done();
      },
      (err: HttpErrorResponse) => {
        expect(err.status).toEqual(400 || 401 || 500 || 503);
      }
    );
    const requestWrapper = httpMock.expectOne(service.treatmentsUrl);
    expect(requestWrapper.request.method).toBe("GET");
    expect(requestWrapper.request.url).toBe(service.treatmentsUrl);
    requestWrapper.flush(mockTreatments);
    httpMock.verify();
  });
  it('should filter treatments based on search input', (done) => {
    service.fetchTreatments(mockParamValues).subscribe(
      (resp) => {
        expect(resp.length).toBe(1);
        done();
      },
      (err: HttpErrorResponse) => {
        expect(err.status).toEqual(400 || 401 || 500 || 503);
      }
    );
    const requestWrapper = httpMock.expectOne(`${service.treatmentsUrl}?treatmentCode=AAA131`);
    expect(requestWrapper.request.method).toBe("GET");
    expect(requestWrapper.request.url).toBe(`${service.treatmentsUrl}`);
    expect(requestWrapper.request.params.get('treatmentCode')).toEqual('AAA131');
    requestWrapper.flush(mockSearchTreatments);
    httpMock.verify();
  });

});
