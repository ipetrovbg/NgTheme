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
import {Directive, HostListener, ElementRef, Renderer2, Input} from '@angular/core';
import { DomHelper } from './dom.helper.model';

@Directive({
  selector: '[appRipple]',
  exportAs: 'appRipple'
})
export class RippleDirective extends DomHelper {
  @Input('color') public color = '#ffffff';

  /**
   * @important
   * timeout should
   * not be grated than execution of "animation: ripple-animation"
   * in your style
   * @type {number}
   */
  @Input('timeout') public timeout = 2500;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    super();
    renderer.addClass(this.el.nativeElement, 'ripple');
  }


  @HostListener('click', ['$event']) click(e) {
    e.preventDefault();

    this._removeOldClasess();

    const $div = this.renderer.createElement('div');
    const btnOffset = RippleDirective.offset(this.el.nativeElement);
    const position = RippleDirective._findPosition(e, btnOffset);

    this._applyStyle( $div, position );

    this._removeRipple( $div );
  }

  /**
   * remove everything related to the ripple effect
   * @param $div
   * @private
   */
  private _removeRipple( $div ) {
    /**
     * fix bug
     * remove .ripple-effect before removing the actual Dom element
     */
    setTimeout(() => {
      this.renderer.removeClass( $div, 'ripple-effect' );
    }, this.timeout - 20 );

    /**
     * remove the actual Dom element
     */
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, $div);
    }, this.timeout );

  }

  private _applyStyle( el, position ) {
    this.renderer.addClass( el, 'ripple-effect' );
    // this.renderer.setStyle( el, 'height', 1 );
    // this.renderer.setStyle( el, 'width', 1 );
    this.renderer.setStyle( el, 'top', `${ position.y }px` );
    this.renderer.setStyle( el, 'left', `${ position.x }px` );
    this.renderer.setStyle( el, 'background', this.color );
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
