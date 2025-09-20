import { Component } from '@angular/core';
import { Table, TableData } from '../table/table';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [Table],
  templateUrl: './page.html',
  styleUrls: ['./page.css']
})
export class Page {
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
