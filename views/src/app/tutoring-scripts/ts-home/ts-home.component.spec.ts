import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsHomeComponent } from './ts-home.component';

describe('TsHomeComponent', () => {
  let component: TsHomeComponent;
  let fixture: ComponentFixture<TsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
