import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancetePage } from './balancete.page';

describe('BalancetePage', () => {
  let component: BalancetePage;
  let fixture: ComponentFixture<BalancetePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancetePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
