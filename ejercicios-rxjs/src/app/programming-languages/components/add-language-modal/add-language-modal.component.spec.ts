import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguageModalComponent } from './add-language-modal.component';

describe('AddLanguageModalComponent', () => {
  let component: AddLanguageModalComponent;
  let fixture: ComponentFixture<AddLanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLanguageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
