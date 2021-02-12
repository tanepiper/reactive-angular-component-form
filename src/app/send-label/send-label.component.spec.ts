import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLabelComponent } from './send-label.component';

describe('SendLabelComponent', () => {
  let component: SendLabelComponent;
  let fixture: ComponentFixture<SendLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
