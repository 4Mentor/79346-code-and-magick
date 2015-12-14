/**
 * Created by Julia on 14.12.2015.
 */
'use strict';
/**
 * Функция записывает в прототип дочернего конструктора child
 * методы и свойства родительского конструктора parent
 * @param {Function} child
 * @param {Function} parent
 */
(function inherit(child, parent) {
  /**
   * @constructor
   */
  var EmptyConstructor = function() {};
  EmptyConstructor.prototype = parent.prototype;
  /**
   *
   * @type {EmptyConstructor}
   */
  child.prototype = new EmptyConstructor();

  window.inherit = inherit;
})();

