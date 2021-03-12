import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {EventManager} from "@angular/platform-browser";
import {Observable, Subject, Subscription} from "rxjs";
import {debounceTime, startWith} from "rxjs/operators";
import {ViewportService} from "./viewport.service";

@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnDestroy {
  private hasView = false;
  sub: Subscription = Subscription.EMPTY;

  get onResize$(): Observable<number> {
    return this.widthSubject.asObservable().pipe(
      startWith(this.window.innerWidth)
    );
  }

  private widthSubject: Subject<number> = new Subject();


  @Input() set ifViewportSize(type: 'small' | 'medium' | 'large') {
    this.sub = this.onResize$.pipe(
      debounceTime(40)
    ).subscribe((viewportWidth) => {
      const canRender = this.viewport.calculateState(viewportWidth, type);

      if (canRender && !this.hasView) {
        this.vcr.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!canRender && this.hasView) {
        this.vcr.clear();
        this.hasView = false;
      }
    })

  };

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private eventManager: EventManager,
    private viewport: ViewportService,
    private window: Window
  ) {
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  private onResize(event: UIEvent): void {
    this.widthSubject.next((event.target as Window)?.innerWidth);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
