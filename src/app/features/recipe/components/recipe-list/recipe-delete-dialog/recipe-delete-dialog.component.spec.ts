import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';

describe('RecipeDeleteDialogComponent', () => {
  let component: RecipeDeleteDialogComponent;
  let fixture: ComponentFixture<RecipeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
