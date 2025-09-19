import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";

export interface Option {
  id: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  type: string;
  label: string;
}

export interface CheckboxFilterConfig extends FilterConfig {
  type: "checkbox";
}

export interface MultiSelectFilterConfig extends FilterConfig {
  type: "multi-select";
}

export interface MultiSelectFilterConfigWithState
  extends MultiSelectFilterConfig {
  options: WritableSignal<Option[]>;
}

export type FilterConfigWithState =
  | CheckboxFilterConfig
  | MultiSelectFilterConfigWithState;

export abstract class Filter<ConfigType extends FilterConfigWithState = FilterConfigWithState, OptionType = boolean | number[]> {
  public readonly selected = signal<OptionType | null>(null);
  public readonly config = signal<ConfigType>({} as ConfigType);

  private readonly layerId = signal<string>('some-layer');

  public readonly urlFilterPrefix = computed(() => {
    return `${this.layerId()}:${this.config().id}`;
  })

  public router: Router;

  constructor(selected: OptionType, router: Router) {
    this.selected.set(selected);
    this.router = router;
  }

  abstract serialize(): string;
}

export class CheckboxFilter extends Filter<CheckboxFilterConfig, boolean> {
  constructor(config: CheckboxFilterConfig, selected: boolean, router: Router) {
    super(selected, router);
    this.config.set(config);
  }

  serialize() {
    return this.selected() ? 'true' : 'false';
  }
}

export class MultiFilter extends Filter<MultiSelectFilterConfigWithState, number[]> {
  constructor(config: MultiSelectFilterConfig, selected: number[], router: Router) {
    super(selected, router);

    const defaultConfig: MultiSelectFilterConfigWithState = {
      ...config,
      options: signal<Option[]>([]),
    };

    this.config.set(defaultConfig);
  }


  serialize() {
    return this.selected()?.join(',') || '';
  }
}

@Injectable({ providedIn: "root" })
export class State {
  public readonly filters = signal<Filter[]>([]);

  private readonly router = inject(Router);

  findFilter(id: string): Filter | undefined {
    return this.filters().find(filter => filter.config().id === id);
  }

  populateFilterOptions(filterId: string, options: Option[]): void {
    const filter = this.findFilter(filterId);
    if (filter && filter.config().type === 'multi-select') {
      const multiSelectFilter = filter as MultiFilter;
      multiSelectFilter.config().options.set(options);
    }
  }

  setFilters(filtersConfig: FilterConfig[]) {
    const filters = filtersConfig.map((config) => {
      switch (config.type) {
        case "checkbox":
          return new CheckboxFilter(config as CheckboxFilterConfig, false, this.router);

        case "multi-select":
        default:
          return new MultiFilter(config as MultiSelectFilterConfig, [], this.router);
          break;
      }
    });
    this.filters.set(filters);
  }
}
