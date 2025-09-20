import { Component, inject, input, linkedSignal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

export interface TableData {
  id: number;
  name: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table implements OnInit {
  public readonly data = input.required<TableData[]>();
  private readonly route = inject(ActivatedRoute);

  public readonly queryParams = toSignal(this.route.queryParams, { initialValue: {} });
  public readonly filteredData = linkedSignal(() => this.data());

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tags = params['some-layer:tags'] ?
        params['some-layer:tags'].split(',').map((tag: string) => tag)
        : null;


      if (tags && tags.length) {
        this.filteredData.set(this.data().filter(item =>
          item.tags.some(tag => tags.includes(tag))
        ));
        return;
      }

      if (this.data()) this.filteredData.set(this.data());
    });
  }

}
