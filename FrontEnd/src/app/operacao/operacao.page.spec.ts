import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoPage } from './operacao.page';

describe('OperacaoPage', () => {
  let component: OperacaoPage;
  let fixture: ComponentFixture<OperacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
