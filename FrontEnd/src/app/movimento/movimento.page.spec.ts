import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoPage } from './movimento.page';

describe('MovimentoPage', () => {
  let component: MovimentoPage;
  let fixture: ComponentFixture<MovimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
