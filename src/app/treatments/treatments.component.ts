import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  shareReplay,
} from 'rxjs';
import { Treatment } from './treatment.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { matchSearchPattern } from './customValidator';
import { TreatmentsService } from './treatments.service';

@Component({
  selector: 'app-treatments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [TreatmentsService],
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
})
export class TreatmentsComponent implements OnInit {
  treatments$ = new BehaviorSubject<Treatment[]>([]).asObservable();
  filterForm!: FormGroup;
  queryfilters = {};
  placeholders = new Array(5);
  loading = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private treatmentService: TreatmentsService
  ) {
    this.filterForm = fb.group({
      search: new FormControl(null, [matchSearchPattern()]),
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(searchfieldvalue => {
        if (
          this.filterForm.controls['search'].valid ||
          !this.filterForm.controls['search'].value
        ) {
          this.fetchTreatments(searchfieldvalue.search.toUpperCase());
        }
      });
  }

  ngOnInit(): void {
    this.fetchTreatments();
  }
  fetchTreatments(param?: { [x: string]: any }): Observable<Treatment[]> {
    this.loading = true;
    const treatmentsUrl = `https://my-json-server.typicode.com/team-carepay/carepay-front-end-assignment-SamNjubi/treatments`;
    if (param) {
      this.queryfilters = { treatmentCode: param };
      this.router.navigateByUrl(
        this.router.createUrlTree([], {
          relativeTo: this.route,
          queryParams: this.queryfilters,
        })
      );
    } else {
      this.queryfilters = {};
      this.route.queryParams
        .subscribe(c => {
          const params = Object.assign({}, c);
          delete params['treatmentCode'];
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
          });
        })
        .unsubscribe();
    }

    this.treatments$ = this.treatmentService.fetchTreatments(this.queryfilters)
      .pipe(
        finalize(() => (this.loading = false)),
        shareReplay()
      );
    return this.treatments$;
  }
  trackByFn(index: number, item: { treatmentCode: string }) {
    return item.treatmentCode;
  }
  placeholdertrackByFn(index: number, item: { treatmentCode: string }) {
    return index;
  }
}
