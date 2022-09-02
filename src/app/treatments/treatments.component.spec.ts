import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TreatmentsComponent } from './treatments.component';

describe('TreatmentsComponent', () => {
  let component: TreatmentsComponent;
  let fixture: ComponentFixture<TreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentsComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form inputs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector(
      'input[id="treatment-search-input"]'
    );
    expect(searchInput).toBeTruthy();
  });

  it('should check form for validity', () => {
    const filterForm = component.filterForm;
    expect(filterForm.valid).toBeFalsy();
    const searchInput = filterForm.controls['search'];
    // 1. set input value to be incorrect -> expect form to be invalid if test passes
    searchInput.setValue('AA123FR');
    expect(filterForm.valid).toBeFalsy();
    expect(searchInput.errors).toBeTruthy();
    // 2. set input value to be correct -> expect form to be valid if test passes
    searchInput.setValue('AAA123FR');
    expect(filterForm.valid).toBeTruthy();
    expect(searchInput.errors).toBeNull();
  });

  it('should render the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const treatmentsTable = compiled.querySelector(
      'table[id="treatments-table"]'
    );
    expect(treatmentsTable).toBeTruthy();
  });
});
