import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  @Input() title!: string;
  @Input() author!: string;
  @Input() field!: string;
  @Input() category!: string;
  @Input() description!: string;
  @Input() stock!: Number;
  currentlyAvailable: Boolean = false;

  ngOnInit(): void {
    if (this.stock > 0) {
      this.currentlyAvailable = true;
    }
  }

}
