/**
 * Implementation reference
 * https://codepen.io/Craigtut/pen/dIfzv
 *
 * style:
 * The directive rely on this styles,
 * paste this snippet in your main style

    .ripple{
      overflow:hidden;
      cursor: pointer;
    }

     .ripple-effect{
      position: absolute;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background: white;
      animation: ripple-animation 2.5s;
    }


     @keyframes ripple-animation {
      from {
        transform: scale(1);
        opacity: 0.4;
      }
      to {
        transform: scale(100);
        opacity: 0;
      }
    }

 *
 */
import { Directive, HostListener, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { DomHelper } from './dom.helper.model';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[appRipple]',
  exportAs: 'appRipple'
})
export class RippleDirective extends DomHelper implements OnInit {

  @Input('color') public color = '#ffffff';

  /**
   * @important
   * timeout should
   * not be grated than execution of "animation: ripple-animation"
   * in your style
   * @type {number}
   */
  @Input('timeout') public timeout = 2500;

  private nativeElement: {width: number, height: number} = {width: 0, height: 0};

  constructor(private renderer: Renderer2, private el: ElementRef) {
    super();

    renderer.addClass(this.el.nativeElement, 'ripple');
    renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  ngOnInit() {
    /**
     * Create Observable from event and trigger event
     * only if window width is changed
     * .distinctUntilChanged() do this magic, because
     * .map() return only width
     * and when window width
     * is different .distinctUntilChanged() will
     * trigger new event.
     */
    Observable.fromEvent(window, 'resize')
      .map((e: any) => e.target.innerWidth)
      .distinctUntilChanged()
      .debounceTime(200)
      .subscribe(this._updateToResponsive.bind(this));
  }

  @HostListener('click', ['$event']) click(e) {
    e.preventDefault();

    this._preventGrow();

    this._removeOldClasess();

    const $div = this.renderer.createElement('div');

    const btnOffset = RippleDirective.offset(this.el.nativeElement);

    const position = RippleDirective._findPosition(e, btnOffset);

    this._applyStyle( $div, position );

    this._removeRippleClasses( $div );
  }

  private _updateToResponsive(): void {

    this._removeStyle();

    this.nativeElement.width = this.el.nativeElement.offsetWidth;
    this.nativeElement.height = this.el.nativeElement.offsetHeight;

    this._renderStyle();
  }

  private _removeStyle(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'width');
    this.renderer.removeStyle(this.el.nativeElement, 'height');
  }

  private _renderStyle(): void {
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.nativeElement.width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.nativeElement.height}px`);
  }

  /**
   * prevent growing native element
   * when new elements are pushed
   * @private
   */
  private _preventGrow() {
    if ( this.nativeElement.width === 0 &&  this.nativeElement.height === 0 ) {
      this.nativeElement.width = this.el.nativeElement.offsetWidth;
      this.nativeElement.height = this.el.nativeElement.offsetHeight;
    }
    this._renderStyle();
  }

  /**
   * remove everything related to the ripple effect
   * @param $div
   * @private
   */
  private _removeRippleClasses( $div ) {
    /**
     * fix bug
     * remove .ripple-effect before removing the actual Dom element
     */
    setTimeout(() => {
      this.renderer.removeClass( $div, 'ripple-effect' );
    }, this.timeout - 20 );

    /**
     * and after 20 milliseconds remove the actual Dom element
     */
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, $div);
    }, this.timeout );

  }

  private _applyStyle( el, position ) {
    this.renderer.addClass( el, 'ripple-effect' );
    this.renderer.setStyle( el, 'top', `${ position.y }px` );
    this.renderer.setStyle( el, 'left', `${ position.x }px` );
    this.renderer.setStyle( el, 'background', this.color );
    this.renderer.setStyle( el, 'opacity', 0.1 );
    this.renderer.appendChild(this.el.nativeElement, el );
  }

  /**
   * clean up the native element from .ripple-effect
   * if it is necessary
   * @private
   */
  private _removeOldClasess() {
    this.el.nativeElement.childNodes.forEach(el => {
      const hasClass = RippleDirective.hasClass(el, 'ripple-effect');
      if ( hasClass ) {
        this.renderer.removeClass(el, 'ripple-effect');
      }
    });
  }
}
