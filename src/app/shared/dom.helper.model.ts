export class DomHelper {
  static offset(elt) {
    const rect = elt.getBoundingClientRect(), bodyElt = document.body;

    return {
      top: rect.top + bodyElt.scrollTop,
      left: rect.left + bodyElt.scrollLeft
    };
  }

  static hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  /**
   * return calculated "x" and "y" position of click
   * related with the element
   * quick fix for click position
   * - 20 for the x and -15 for the y
   * because the element for the effect is 50x50
   * @param e
   * @param btnOffset
   * @returns {{x: number, y: number}}
   * @private
   */
  static _findPosition( e, btnOffset ) {
    const xPos = e.pageX - btnOffset.left;
    const yPos = e.pageY - btnOffset.top;
    return { x: xPos - 20, y: yPos - 15 };
  }
}
