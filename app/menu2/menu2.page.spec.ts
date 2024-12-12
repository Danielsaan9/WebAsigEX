import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu2Page } from './menu2.page';

describe('Menu2Page', () => {
  let component: Menu2Page;
  let fixture: ComponentFixture<Menu2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('MiComponente', () => {
    it('debería crear el componente correctamente', () => {
      expect(component).toBeTruthy();
    });
  });
  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});
