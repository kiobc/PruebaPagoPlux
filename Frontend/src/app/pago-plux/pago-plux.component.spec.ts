import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPluxComponent } from './pago-plux.component';

describe('PagoPluxComponent', () => {
  let component: PagoPluxComponent;
  let fixture: ComponentFixture<PagoPluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoPluxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoPluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
