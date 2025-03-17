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

  it('1. add method should return 0 for an empty string', () => {
    expect(component.add("")).toBe(0);
  });

  it('2. add method should return sum of all comma-separated numbers', () => {
    expect(component.add("1,5")).toBe(6);
  });

  it('3. add method should handle new lines between numbers', () => {
    expect(component.add("1\n2,3")).toBe(6);
  });

  it('4. add method should support different delimiters', () => {
    expect(component.add("//;\n1;2")).toBe(3);
  });

  it('5. add method should throw an exception for negative numbers', () => {
    expect(() => component.add("1,-2,3,-4")).toThrowError("negative numbers not allowed -2,-4");
  });

  it('6. add method should ignore numbers greater than 1000', () => {
    expect(component.add("2,1001")).toBe(2);
    expect(component.add("1000,999")).toBe(1999);
  });

  it('7. add method should support delimiters of any length', () => {
    expect(component.add("//[***]\n1***2***3")).toBe(6);
  });
  it('8 method should support multiple delimiters', () => {
    expect(component.add("//[*][%]\n1*2%3")).toBe(6);
  });

  it('9. method should support multiple delimiters with length longer than one character', () => {
    expect(component.add("//[***][%%]\n1***2%%3")).toBe(6);
  });
});
