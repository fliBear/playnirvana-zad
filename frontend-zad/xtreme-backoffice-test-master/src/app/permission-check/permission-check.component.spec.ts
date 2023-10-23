import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionCheckComponent } from './permission-check.component';

describe('PermissionCheckComponent', () => {
  let component: PermissionCheckComponent;
  let fixture: ComponentFixture<PermissionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
