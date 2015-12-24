/**
 * Created by Julia on 18.12.2015.
 */
'use strict';
/* global define: true */
define([
  'gallery',
  'photo',
  'hash-change'
], function(Gallery, Photo, onHashChange) {
  var arrLinks = document.querySelectorAll('.photogallery-image');

  /**
   * Делаем массив из элементов Photo
   * @type {Array}
   */
  var arrayPhoto = [].map.call(arrLinks, function(img, i) {
    img = arrLinks[i].getElementsByTagName('img');
    img = img[0].cloneNode(true);
    return new Photo(img);
  });

  /**
   * @type {Gallery}
   */
  var gallery = new Gallery();
  gallery.setPictures(arrayPhoto);
  onHashChange();

  return gallery;
})();
