import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface SelectItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-select-with-search',
  templateUrl: './select-with-search.component.html',
  styleUrl: './select-with-search.component.scss',
})
export class SelectWithSearchComponent implements OnInit {
  @Input() label = '';
  @Input() control!: FormControl;
  @Input() items: SelectItem[] = [];

  ngOnInit(): void {
    console.log('this.items', this.items);
  }
}
