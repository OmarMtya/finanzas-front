import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMensualComponent } from './ingreso-mensual.component';

describe('IngresoMensualComponent', () => {
  let component: IngresoMensualComponent;
  let fixture: ComponentFixture<IngresoMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoMensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
