/**
 * Created by Julia on 14.12.2015.
 */
'use strict';
/**
 * 2 вспомогательных конструктора, когда будем использовать функцию уберу
 * @constructor
 */
var HelpingConstructorParent = function() {};
var HelpingConstructorChild = function() {};
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
})(HelpingConstructorChild, HelpingConstructorParent);
