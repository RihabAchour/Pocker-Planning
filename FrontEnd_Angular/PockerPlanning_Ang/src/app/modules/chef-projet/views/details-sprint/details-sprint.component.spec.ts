import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSprintComponent } from './details-sprint.component';

describe('DetailsSprintComponent', () => {
  let component: DetailsSprintComponent;
  let fixture: ComponentFixture<DetailsSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
