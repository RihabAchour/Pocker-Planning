import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetsDeveloppeurComponent } from './list-projets-developpeur.component';

describe('ListProjetsDeveloppeurComponent', () => {
  let component: ListProjetsDeveloppeurComponent;
  let fixture: ComponentFixture<ListProjetsDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjetsDeveloppeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjetsDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
