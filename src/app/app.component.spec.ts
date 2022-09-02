import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TreatmentsComponent } from './treatments/treatments.component';

describe('AppComponent', () => {

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'treatments', component: TreatmentsComponent }
      ])],
      declarations: [AppComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    router = TestBed.get(Router);
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'carepay-front-end-assignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('carepay-front-end-assignment');
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'Carepay assignment'
    );
  });
  it('should render treatments component', fakeAsync(() => {
    router.navigate(['/treatments']);
    tick();
    expect(router.url).toBe('/treatments');
  }))
});
