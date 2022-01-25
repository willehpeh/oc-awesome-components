import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value) {
      const currentDate = Date.now();
      const dateVal = new Date(value).getTime();
      const timeDifference = currentDate - dateVal;
      if (timeDifference < (60 * 1000)) {
        return 'Il y a quelques secondes';
      } else if (timeDifference < (60 * 60 * 1000)) {
        return 'Il y a quelques minutes';
      } else if (timeDifference < (24 * 60 * 60 * 1000)) {
        return 'Il y a quelques heures';
      } else {
        return value;
      }
    } else {
      return '';
    }
  }
}
