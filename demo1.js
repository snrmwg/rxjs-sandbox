import { Subject, interval } from "rxjs"; 
import { takeUntil } from "rxjs/operators";

const l = console.log;
const delay = ms => new Promise(res => setTimeout(res, ms));


const _unsubscribe$ = new Subject();

function startUnsubscribtion() {
  _unsubscribe$.next();
  _unsubscribe$.complete();
}

function getDaten$(id) {
  return interval(1000);
}

function ladeDaten(id) {
  //startUnsubscribtion();
  _unsubscribe$.next();
  getDaten$(id).pipe(
    takeUntil(_unsubscribe$)
  ).subscribe( x => console.log(`Daten zu ${id}: ${x}`) );
}


l("Starte Datenabfrage für id 1")
ladeDaten(1);
await delay(2100);
l("Starte Datenabfrage für id 2")
ladeDaten(2);

await delay(3100);

l("ende")

_unsubscribe$.next();
_unsubscribe$.complete();
