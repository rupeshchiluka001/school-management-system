import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractLibInfoService } from 'src/app/services/extract-lib-info.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2,
              private libService: ExtractLibInfoService) { }

  @Input() book!: Book;
  currentlyAvailable: Boolean = false;
  divShown = false;
  @ViewChild('bookOp') bookOp!: ElementRef;
  @Output() updateBookNotify: EventEmitter<Book> = new EventEmitter<Book>();
  div!: HTMLDivElement;
  sub!: Subscription;

  ngOnInit(): void {
    if (this.book.stock > 0) {
      this.currentlyAvailable = true;
    }
  }

  ngAfterViewInit(): void {
    this.div = this.renderer.selectRootElement(this.bookOp["nativeElement"], true);
  }

  notifyUpdate() {
    this.updateBookNotify.emit(this.book);
  }

  toggleDiv(): void {
    this.divShown = !this.divShown;
    this.div.style.visibility = (this.divShown) ? 'visible' : 'hidden';
  }

  deleteBook(): void {
    console.log("deleting ", this.book._id);
    this.sub = this.libService.deleteBook(this.book._id).subscribe({
      next: data => console.log("Book:", data),
      error: err => console.log("err: ", err),
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) {
      this.sub.unsubscribe();
    }
  }

}
