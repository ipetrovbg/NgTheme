import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  exportAs: 'appRipple'
})
export class RippleDirective {
  static offset(elt) {
    const rect = elt.getBoundingClientRect(), bodyElt = document.body;

    return {
      top: rect.top + bodyElt .scrollTop,
      left: rect.left + bodyElt .scrollLeft
    };
  }
  constructor(private renderer: Renderer2 , private el: ElementRef ) {
    renderer.addClass(this.el.nativeElement, 'ripple');
  }



  @HostListener('click', ['$event']) onClick(e) {
    e.preventDefault();
    const $div = this.renderer.createElement('div');
    const btnOffset = RippleDirective.offset(this.el.nativeElement);
    const xPos = e.pageX - btnOffset.left;
    const yPos = e.pageY - btnOffset.top;
    this.renderer.addClass($div, 'ripple-effect');
    this.renderer.setStyle($div, 'height', 200);
    this.renderer.setStyle($div, 'width', 500);
    this.renderer.setStyle($div, 'top', yPos + 'px');
    this.renderer.setStyle($div, 'left', xPos + 'px');
    this.renderer.setStyle($div, 'background', 'white');
    this.renderer.appendChild(this.el.nativeElement, $div);
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, $div);
    }, 1000);
  }
}
