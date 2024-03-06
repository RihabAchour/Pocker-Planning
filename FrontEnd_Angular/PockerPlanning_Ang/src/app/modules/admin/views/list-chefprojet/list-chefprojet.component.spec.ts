import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChefprojetComponent } from './list-chefprojet.component';

describe('ListChefprojetComponent', () => {
  let component: ListChefprojetComponent;
  let fixture: ComponentFixture<ListChefprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChefprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChefprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
