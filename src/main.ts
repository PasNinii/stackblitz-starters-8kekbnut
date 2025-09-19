import { Component, inject, OnInit, provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { FilterListComponent } from "./filters/filter-list.component";
import { PageComponent } from "./components/page/page.component";
import { State } from "./filters/state.service";
import { TableData } from "./components/table/table.component";
import "./main.css";

@Component({
  selector: "app-root",
  imports: [FilterListComponent, PageComponent],
  template: `
    <div class="app-container">

      <main class="app-main">
        <section class="filters-section">
          <h2 class="section-title">Filters</h2>
          <filter-list />
        </section>

        <section class="demo-section">
          <app-page />
        </section>
      </main>

    </div>
  `,
})
export class App implements OnInit {
  public readonly state = inject(State);

  // Sample data to extract tags from
  private readonly allData: TableData[] = [
    // Products data
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      tags: ['audio', 'wireless', 'bluetooth', 'premium']
    },
    {
      id: 2,
      name: 'Gaming Laptop',
      category: 'Electronics',
      tags: ['gaming', 'laptop', 'high-performance', 'rgb']
    },
    {
      id: 3,
      name: 'Coffee Maker',
      category: 'Kitchen',
      tags: ['coffee', 'appliance', 'morning', 'automatic']
    },
    {
      id: 4,
      name: 'Running Shoes',
      category: 'Sports',
      tags: ['footwear', 'running', 'athletic', 'comfortable']
    },
    {
      id: 5,
      name: 'Smartphone',
      category: 'Electronics',
      tags: ['mobile', 'communication', '5g', 'camera']
    },
    // Services data
    {
      id: 6,
      name: 'Web Development',
      category: 'Technology',
      tags: ['frontend', 'backend', 'responsive', 'modern']
    },
    {
      id: 7,
      name: 'Digital Marketing',
      category: 'Marketing',
      tags: ['seo', 'social-media', 'analytics', 'growth']
    },
    {
      id: 8,
      name: 'Graphic Design',
      category: 'Creative',
      tags: ['logo', 'branding', 'visual', 'creative']
    },
    {
      id: 9,
      name: 'Consulting',
      category: 'Business',
      tags: ['strategy', 'advisory', 'optimization', 'growth']
    },
    {
      id: 10,
      name: 'Data Analysis',
      category: 'Technology',
      tags: ['data', 'insights', 'reporting', 'visualization']
    }
  ];

  ngOnInit() {
    this.state.setFilters([
      {
        id: 'tags',
        type: "multi-select",
        label: "Tags",
      },
      { id: 'technology', type: "checkbox", label: "Only Technology" },
    ]);

    // Extract all unique tags from the data
    const allTags = this.allData
      .flatMap(item => item.tags)
      .filter((tag, index, array) => array.indexOf(tag) === index)
      .sort();

    // Create options for the tags filter
    const tagOptions = allTags.map((tag, index) => ({
      id: tag,
      label: tag
    }));

    // Populate the tags filter with options
    this.state.populateFilterOptions('tags', tagOptions);
  }
}

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection(), provideRouter([])],
});
