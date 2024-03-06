import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDevelopersToProjectComponent } from './assign-developers-to-project.component';

describe('AssignDevelopersToProjectComponent', () => {
  let component: AssignDevelopersToProjectComponent;
  let fixture: ComponentFixture<AssignDevelopersToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDevelopersToProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDevelopersToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
