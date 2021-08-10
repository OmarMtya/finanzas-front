import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSobresComponent } from './listado-sobres.component';

describe('ListadoSobresComponent', () => {
  let component: ListadoSobresComponent;
  let fixture: ComponentFixture<ListadoSobresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoSobresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSobresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
