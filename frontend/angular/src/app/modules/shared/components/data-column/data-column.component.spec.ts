import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataColumnComponent } from './data-column.component';

describe('DataColumnComponent', () => {
  let component: DataColumnComponent;
  let fixture: ComponentFixture<DataColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
