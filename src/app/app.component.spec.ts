import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent - String Calculator', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('add method should return 0 for an empty string', () => {
    expect(component.add("")).toBe(0);
  });

  it('add method should return sum of all comma-separated numbers', () => {
    expect(component.add("1,5")).toBe(6);
  });

  it('add method should handle new lines between numbers', () => {
    expect(component.add("1\n2,3")).toBe(6);
  });

});
