import { Subject, interval } from "rxjs"; 
import { switchMap, takeUntil, map } from "rxjs/operators";

const l = console.log;
const delay = ms => new Promise(res => setTimeout(res, ms));


const id$ = new Subject();
const _unsubscribe$ = new Subject();


function getDaten$(id) {
  return interval(1000).pipe(map(v => `Daten zu ${id}: ${v}`));
}

id$.pipe(
  switchMap(id => getDaten$(id)),
  takeUntil(_unsubscribe$)
).subscribe( x => console.log(`Oberserver: ${x}`) );


l("Starte Datenabfrage für id 1")
id$.next(1);
await delay(2100);
l("Starte Datenabfrage für id 2")
id$.next(2);

await delay(3100);

l("ende")

_unsubscribe$.next();
_unsubscribe$.complete();
