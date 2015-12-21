/**
 * Created by Julia on 16.12.2015.
 */
'use strict';
( function() {
  /**
   *
   * @param {Element} element
   * @constructor
   */
  function Photo(element) {
    this._element = element;
  }

  /**
   *
   * @returns {Element}
   */
  Photo.prototype.getPhoto = function() {
    return this._element;
  };

  window.Photo = Photo;
})();
