import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchString: string): any {
    const contacts = [];
    for(let i=0; i<value.length; ++i){
      let nums = value[i].numbers.find(number => {
        return number.indexOf(searchString) !== -1;
      });
      if(value[i].name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || nums != null) {
        contacts.push(value[i]);
      }
    }
    return contacts;
  }

}
