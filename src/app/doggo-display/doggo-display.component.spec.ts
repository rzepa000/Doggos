import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoggoDisplayComponent } from './doggo-display.component';

describe('DoggoDisplayComponent', () => {
  let component: DoggoDisplayComponent;
  let fixture: ComponentFixture<DoggoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoggoDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoggoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
