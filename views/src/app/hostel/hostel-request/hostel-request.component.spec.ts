import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelRequestComponent } from './hostel-request.component';

describe('HostelRequestComponent', () => {
  let component: HostelRequestComponent;
  let fixture: ComponentFixture<HostelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
