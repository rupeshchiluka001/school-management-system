import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2) { }

  @Input() book!: Book;
  currentlyAvailable: Boolean = false;
  divShown = false;
  @ViewChild('bookOp') bookOp!: ElementRef;
  div!: HTMLDivElement;

  ngOnInit(): void {
    if (this.book.stock > 0) {
      this.currentlyAvailable = true;
    }
  }

  ngAfterViewInit(): void {
    this.div = this.renderer.selectRootElement(this.bookOp["nativeElement"], true);
  }

  toggleDiv(): void {
    this.divShown = !this.divShown;
    this.div.style.visibility = (this.divShown) ? 'visible' : 'hidden';
  }

}
