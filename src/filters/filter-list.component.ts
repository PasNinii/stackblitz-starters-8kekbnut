import { Component, inject, OnInit, DestroyRef } from "@angular/core";
import { State, MultiSelectFilterConfigWithState } from "./state.service";
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Params, Router } from "@angular/router";

@Component({
  selector: "filter-list",
  imports: [ReactiveFormsModule],
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  protected readonly state = inject(State);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router);

  public filterForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.buildForm();
    this.syncFormWithState();
  }

  getOptionsForFilter(filter: any) {
    if (filter.config().type === 'multi-select') {
      return (filter.config() as MultiSelectFilterConfigWithState).options();
    }
    return [];
  }

  resetFilters(): void {
    // Reset form values
    this.state.filters().forEach(filter => {
      const controlName = `filter_${filter.config().id}`;
      const resetValue = filter.config().type === 'checkbox' ? false : [];

      this.filterForm.get(controlName)?.setValue(resetValue);
      filter.selected.set(resetValue);
    });

    // Clear all query parameters
    this.router.navigate([], { queryParams: {} });
  }

  hasActiveFilters(): boolean {
    return this.state.filters().some(filter => {
      const selected = filter.selected();
      if (filter.config().type === 'checkbox') {
        return selected === true;
      } else {
        return Array.isArray(selected) && selected.length > 0;
      }
    });
  }

  private buildForm(): void {
    const controls: { [key: string]: FormControl } = {};

    this.state.filters().forEach(filter => {
      const controlName = `filter_${filter.config().id}`;
      const initialValue = filter.config().type === 'checkbox'
        ? filter.selected()
        : filter.selected();

      controls[controlName] = new FormControl(initialValue);
    });

    this.filterForm = this.fb.group(controls);
  }


  private syncFormWithState(): void {
    // Sync form changes to state
    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(values => {
        const queryParams: Params = {};

        this.state.filters().forEach(filter => {
          const controlName = `filter_${filter.config().id}`;
          const formValue = values[controlName];

          if (filter.config().type === 'checkbox') {
            // For checkbox, convert boolean to array
            filter.selected.set(formValue);
          } else {
            // For multi-select, use the array directly
            filter.selected.set(formValue || []);
          }

          queryParams[filter.urlFilterPrefix()] = filter.serialize()
        });

        this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      });
  }

}
