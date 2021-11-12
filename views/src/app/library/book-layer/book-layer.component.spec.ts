import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLayerComponent } from './book-layer.component';

describe('BookLayerComponent', () => {
  let component: BookLayerComponent;
  let fixture: ComponentFixture<BookLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
