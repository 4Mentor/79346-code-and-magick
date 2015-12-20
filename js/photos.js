/**
 * Created by Julia on 18.12.2015.
 */
'use strict';
/* global Gallery: true, Photo: true */
( function() {
  var arrLinks = document.querySelectorAll('.photogallery-image img');

  /**
   * Делаем массив из элементов Photo
   * @type {Array}
   */
  var ArrayPhoto = [].map.call(arrLinks, function(img, i) {
    img = arrLinks[i].getElementsByTagName('img');
    return new Photo(img);
  });

  /**
   * @type {Gallery}
   */
  var gallery = new Gallery();
  gallery.setPictures(ArrayPhoto);
  window.gallery = gallery;
})();
