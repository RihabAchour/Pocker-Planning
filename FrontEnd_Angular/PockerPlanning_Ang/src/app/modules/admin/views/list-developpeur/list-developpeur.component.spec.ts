import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeveloppeurComponent } from './list-developpeur.component';

describe('ListDeveloppeurComponent', () => {
  let component: ListDeveloppeurComponent;
  let fixture: ComponentFixture<ListDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeveloppeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
