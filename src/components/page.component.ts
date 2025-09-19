import { Component } from '@angular/core';
import { TableComponent, TableData } from './table.component';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [TableComponent],
    template: `
    <div class="page-container">
      <h1>Demo Tables Page</h1>

      <div class="tables-section">
        <section class="table-section">
          <h2>Products Table</h2>
          <app-table [data]="productsData"></app-table>
        </section>

        <section class="table-section">
          <h2>Services Table</h2>
          <app-table [data]="servicesData"></app-table>
        </section>
      </div>
    </div>
  `,
    styles: [`

  `]
})
export class PageComponent {
    productsData: TableData[] = [
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
        }
    ];

    servicesData: TableData[] = [
        {
            id: 1,
            name: 'Web Development',
            category: 'Technology',
            tags: ['frontend', 'backend', 'responsive', 'modern']
        },
        {
            id: 2,
            name: 'Digital Marketing',
            category: 'Marketing',
            tags: ['seo', 'social-media', 'analytics', 'growth']
        },
        {
            id: 3,
            name: 'Graphic Design',
            category: 'Creative',
            tags: ['logo', 'branding', 'visual', 'creative']
        },
        {
            id: 4,
            name: 'Consulting',
            category: 'Business',
            tags: ['strategy', 'advisory', 'optimization', 'growth']
        },
        {
            id: 5,
            name: 'Data Analysis',
            category: 'Technology',
            tags: ['data', 'insights', 'reporting', 'visualization']
        }
    ];
}
