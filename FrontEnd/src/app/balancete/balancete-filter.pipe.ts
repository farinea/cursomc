import { Pipe, PipeTransform } from '@angular/core';
import { BalanceteViewDTO } from 'src/models/balanceteview.dto';
@Pipe({
  name: 'filterBalancete',
  pure: false
})
export class BalanceteFilterPipe implements PipeTransform {
  transform(items: BalanceteViewDTO[], tipoConta: string): any[] {
    if(!items) return [];
    if(!tipoConta) return items;

    return items.filter(i => (i.tipoConta === tipoConta));
   }
}