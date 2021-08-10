import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaSobreComponent } from './carta-sobre.component';

describe('CartaSobreComponent', () => {
  let component: CartaSobreComponent;
  let fixture: ComponentFixture<CartaSobreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaSobreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
