import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h2>Test Driven Development</h2>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    // return numbers.split(',').map(num => parseInt(num, 10)).reduce((sum, num) => sum + num, 0);
    // return numbers
    // .split(/,|\n/) // Split by comma or newline
    // .map(num => parseInt(num, 10))
    // .reduce((sum, num) => sum + num, 0);

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      delimiter = new RegExp(parts[0].substring(2));
      numbers = parts[1];
    }

    return numbers
      .split(delimiter)
      .map(num => parseInt(num, 10))
      .reduce((sum, num) => sum + num, 0);

  }

  ngOnInit(){
    let result1 = this.add('');
    let result2 = this.add("1");
    let result3 = this.add('1,5');
    console.log(`for input : ""`, result1);
    console.log(`for input : "1" : `, result2);
    console.log(`for input : "1,5" : `, result3);

    console.log("---------------------------------------------");
    let result4 = this.add("1\n2,3")
    console.log(`method to handle new lines between numbers (instead of commas) for input "1\n2,3"`, result4);

    console.log("-------------------------------------------------");

    let result5 = this.add("//;\n1;2");
    console.log(`Support different delimiters for input "//;\n1;2"`, result5);



  }
}
