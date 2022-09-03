import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Treatment } from '../model/treatment.model';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  treatments$ = new BehaviorSubject<Treatment[]>([]).asObservable();
  treatmentsUrl = `https://my-json-server.typicode.com/team-carepay/carepay-front-end-assignment-SamNjubi/treatments`;

  constructor(private http: HttpClient) {}
  fetchTreatments(param?: { [x: string]: any }): Observable<Treatment[]> {
    this.treatments$ = this.http
      .get<Treatment[]>(this.treatmentsUrl, { params: param })
      .pipe(shareReplay());
    return this.treatments$;
  }
}
