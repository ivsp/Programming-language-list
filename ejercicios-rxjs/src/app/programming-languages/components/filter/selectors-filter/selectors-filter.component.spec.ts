import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorsFilterComponent } from './selectors-filter.component';

describe('SelectorsFilterComponent', () => {
  let component: SelectorsFilterComponent;
  let fixture: ComponentFixture<SelectorsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
