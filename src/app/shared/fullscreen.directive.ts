import { Directive, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CounterActions } from '../store/actions';

@Directive({
  selector: '[appFullscreen],[app-full-screen],[full-screen],[fullScreen]',
  exportAs: 'appFullScreen'
})
export class FullscreenDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private actions: CounterActions
  ) {}

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'click')
      .debounceTime(200)
      .subscribe(() => {
      this.actions.fullScreenAction();
        this.launchIntoFullscreen(document.documentElement);
        if (!document.fullscreenElement &&    // alternative standard method
          !document.webkitFullscreenElement ) {  // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
    });
  }


  launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}
