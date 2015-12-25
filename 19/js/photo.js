/**
 * Created by Julia on 16.12.2015.
 */
'use strict';
/* global define: true */
define( function() {
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

  /**
   *
   * @returns {string}
   */
  Photo.prototype.getSrc = function() {
    return this._element.attributes[0].value;
  };

  return Photo;
});
