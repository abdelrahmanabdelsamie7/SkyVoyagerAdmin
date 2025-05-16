import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 35): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }
}
