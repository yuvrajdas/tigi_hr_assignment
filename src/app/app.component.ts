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
    /*****************************************1, 2**************************************************/
    // return numbers.split(',').map(num => parseInt(num, 10)).reduce((sum, num) => sum + num, 0);
    // return numbers
    // .split(/,|\n/) // Split by comma or newline
    // .map(num => parseInt(num, 10))
    // .reduce((sum, num) => sum + num, 0);

    /***************************************** 3, 4 **************************************************/
    // let delimiter = /,|\n/;
    // if (numbers.startsWith("//")) {
    //   const parts = numbers.split("\n");
    //   delimiter = new RegExp(parts[0].substring(2));
    //   numbers = parts[1];
    // }

    // return numbers
    //   .split(delimiter)
    //   .map(num => parseInt(num, 10))
    //   .reduce((sum, num) => sum + num, 0);


    /***************************************** 5 **************************************************/
    // let delimiter = /,|\n/;
    // if (numbers.startsWith("//")) {
    //   const parts = numbers.split("\n");
    //   delimiter = new RegExp(parts[0].substring(2));
    //   numbers = parts[1];
    // }

    // const numArray = numbers.split(delimiter).map(num => parseInt(num, 10));

    // const negativeNumbers = numArray.filter(num => num < 0);
    // if (negativeNumbers.length > 0) {
    //   throw new Error(`negative numbers not allowed ${negativeNumbers.join(",")}`);
    // }

    // return numArray.reduce((sum, num) => sum + num, 0);



    /* 6. Numbers bigger than 1000 should be ignored, so adding 2 + 1001 = 2 */
    // let delimiter = /,|\n/;
    // if (numbers.startsWith("//")) {
    //   const parts = numbers.split("\n");
    //   delimiter = new RegExp(parts[0].substring(2));
    //   numbers = parts[1];
    // }

    // const numArray = numbers.split(delimiter)
    //   .map(num => parseInt(num, 10))
    //   .filter(num => num <= 1000); // Ignore numbers greater than 1000

    // const negativeNumbers = numArray.filter(num => num < 0);
    // if (negativeNumbers.length > 0) {
    //   throw new Error(`negative numbers not allowed ${negativeNumbers.join(",")}`);
    // }

    // return numArray.reduce((sum, num) => sum + num, 0);


    /*********************  7. Delimiters can be of any length with the following format: “//[delimiter]\n” for example: “//[***]\n1***2***3” should return 6 *******************************/
    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      const delimiterPart = parts[0].substring(2);

      // Step 5 & 7: Support multiple delimiters and escape special characters
      const delimiters = delimiterPart.match(/\[(.*?)\]/g);

      if (delimiters) {
        const escapedDelimiters = delimiters.map(d => d.slice(1, -1).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        delimiter = new RegExp(escapedDelimiters.join("|"));
      } else {
        delimiter = new RegExp(delimiterPart.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      }

      numbers = parts[1];
    }

    const numArray = numbers.split(delimiter)
      .map(num => parseInt(num, 10))
      .filter(num => !isNaN(num));

    // Step 6: Ignore numbers > 1000
    const validNumbers = numArray.filter(num => num <= 1000);

    // Step 4: Handle negative numbers
    const negativeNumbers = validNumbers.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed ${negativeNumbers.join(",")}`);
    }

    return validNumbers.reduce((sum, num) => sum + num, 0);
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

    console.log('-------------------------------------------------------');
    // let result6 = this.add("1,-2,3,-4");
    // console.log(`add with a negative number will throw an exception: for input "1,-2,3,-4"`, result6);

    console.log("----------------------------------------------------------");
    let result7 = this.add("2,1001")
    console.log(`Numbers bigger than 1000 should be ignored for input "2,1001"`, result7 );



    console.log("----------------------------------------------------------");
    let result8 = this.add("//[***]\n1***2***3")
    console.log(`Delimiters can be of any length with the following format, input "//[***]\n1***2***3"`, result8 );


  }
}
