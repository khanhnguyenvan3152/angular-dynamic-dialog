import {
  CdkScrollable,
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  from,
  fromEvent,
} from 'rxjs';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css'],
})
export class VirtualScrollComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private cdr: ChangeDetectorRef
  ) {}
  public lastPos = 0;
  states$: BehaviorSubject<any> = new BehaviorSubject(STATES);
  public scrolledIndex = 0;
  public loadNextPage$ = new BehaviorSubject(null);
  ngOnInit() {
    // this.scrollDispatcher.scrolled(200).subscribe((rs: CdkScrollable) => {
    //   // console.log(rs.measureScrollOffset('top'));
    // });
    // this.viewport.elementScrolled().subscribe((rs) => {
    //   console.log(rs);
    // });
    this.loadNextPage$.pipe(debounceTime(300)).subscribe((rs) => {
      if (rs == 'prev') {
        this.states$.next([...STATES, ...this.states$.value]);
      }
      if (rs == 'after') {
        this.states$.next([...this.states$.value, ...STATES]);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(STATES.length);

    this.viewport.elementScrolled().subscribe((rs) => {
      const currentPos = this.viewport.measureScrollOffset('top');
      this.lastPos = currentPos;
    });
    this.states$.subscribe((rs) => {
      this.viewport.scrollToIndex(51); //pageSize + firstIndex
    });
  }
  @HostListener('wheel', ['$event']) onWheel(event: WheelEvent) {
    const currentPos = this.viewport.measureScrollOffset('top');
    if (this.scrolledIndex < 2) {
      this.loadNextPage$.next('prev');
    }
    if (this.scrolledIndex > this.states$.value.length - 2) {
      this.loadNextPage$.next('after');
    }
    // console.log(this.scrolledIndex)
    // console.log(event.deltaY, event.target);
    // if((this.lastPos <= this.viewport.elementRef.nativeElement.scrollHeight / 10) && (currentPos <= this.lastPos) && event.deltaY < 0) {
    //   from([1]).pipe(debounceTime(1000)).subscribe(() => {
    //     this.states$.next([...STATES.reverse(),...STATES]);
    //   })
    //   console.log()
    //   this.cdr.detectChanges();
    //   console.log(this.lastPos);
    //   console.log(this.states$.value.length)
    // }
  }

  onScroll(event) {
    console.log('onscroll', this.scrolledIndex);
  }

  public get size() {
    return this.states$.value.length;
  }

  onScrolledChange(event) {
    this.scrolledIndex = event;
  }
}

function flatten(arr) {
  var array = [];
  while (arr.length) {
    var value = arr.shift();
    if (Array.isArray(value)) {
      // this line preserve the order
      arr = value.concat(arr);
    } else {
      array.push(value);
    }
  }
  return array;
}

const USA = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  { name: 'Arkansas', capital: 'Little Rock' },
  { name: 'California', capital: 'Sacramento' },
  { name: 'Colorado', capital: 'Denver' },
  { name: 'Connecticut', capital: 'Hartford' },
  { name: 'Delaware', capital: 'Dover' },
  { name: 'Florida', capital: 'Tallahassee' },
  { name: 'Georgia', capital: 'Atlanta' },
  { name: 'Hawaii', capital: 'Honolulu' },
  { name: 'Idaho', capital: 'Boise' },
  { name: 'Illinois', capital: 'Springfield' },
  { name: 'Indiana', capital: 'Indianapolis' },
  { name: 'Iowa', capital: 'Des Moines' },
  { name: 'Kansas', capital: 'Topeka' },
  { name: 'Kentucky', capital: 'Frankfort' },
  { name: 'Louisiana', capital: 'Baton Rouge' },
  { name: 'Maine', capital: 'Augusta' },
  { name: 'Maryland', capital: 'Annapolis' },
  { name: 'Massachusetts', capital: 'Boston' },
  { name: 'Michigan', capital: 'Lansing' },
  { name: 'Minnesota', capital: 'St. Paul' },
  { name: 'Mississippi', capital: 'Jackson' },
  { name: 'Missouri', capital: 'Jefferson City' },
  { name: 'Montana', capital: 'Helena' },
  { name: 'Nebraska', capital: 'Lincoln' },
  { name: 'Nevada', capital: 'Carson City' },
  { name: 'New Hampshire', capital: 'Concord' },
  { name: 'New Jersey', capital: 'Trenton' },
  { name: 'New Mexico', capital: 'Santa Fe' },
  { name: 'New York', capital: 'Albany' },
  { name: 'North Carolina', capital: 'Raleigh' },
  { name: 'North Dakota', capital: 'Bismarck' },
  { name: 'Ohio', capital: 'Columbus' },
  { name: 'Oklahoma', capital: 'Oklahoma City' },
  { name: 'Oregon', capital: 'Salem' },
  { name: 'Pennsylvania', capital: 'Harrisburg' },
  { name: 'Rhode Island', capital: 'Providence' },
  { name: 'South Carolina', capital: 'Columbia' },
  { name: 'South Dakota', capital: 'Pierre' },
  { name: 'Tennessee', capital: 'Nashville' },
  { name: 'Texas', capital: 'Austin' },
  { name: 'Utah', capital: 'Salt Lake City' },
  { name: 'Vermont', capital: 'Montpelier' },
  { name: 'Virginia', capital: 'Richmond' },
  { name: 'Washington', capital: 'Olympia' },
  { name: 'West Virginia', capital: 'Charleston' },
  { name: 'Wisconsin', capital: 'Madison' },
  { name: 'Wyoming', capital: 'Cheyenne' },
];

export const STATES = USA;
