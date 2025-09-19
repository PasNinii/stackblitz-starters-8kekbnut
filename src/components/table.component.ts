import { Component, input } from '@angular/core';

export interface TableData {
  id: number;
  name: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          @for (item of data(); track item.id) {
            <tr >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span >{{ item.category }}</span>
              </td>
              <td>
                <div >
                  @for (tag of item.tags; track tag) {
                    <span
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
  `,

})
export class TableComponent {
  public readonly data = input<TableData[]>();
}
