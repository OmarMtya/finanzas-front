import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSobreComponent } from './agregar-sobre.component';

describe('AgregarSobreComponent', () => {
  let component: AgregarSobreComponent;
  let fixture: ComponentFixture<AgregarSobreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSobreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
