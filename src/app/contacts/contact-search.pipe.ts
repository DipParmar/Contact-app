import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactSearch'
})
export class ContactSearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
