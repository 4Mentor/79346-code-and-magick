/**
 * Created by Julia on 18.12.2015.
 */
'use strict';
/* global define: true */
define([
  'gallery',
  'photo'
], function(Gallery, Photo) {
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

  var onHashChange = function() {
    var REG_EXP = /#photo\/(\S+)/;
    if (location.hash.match(REG_EXP)) {
      gallery.show();
      var srcString = location.hash.substr(7);
      gallery.setCurrentPicture(srcString);
    } else {
      gallery.hide();
    }
  };

  var photogalleryImages = document.querySelectorAll('.photogallery-image');
  /**
   * Обработчик события клика на фотографии фотогалереи
   * @param {Event} event
   */
  for (var i = 0; i < photogalleryImages.length; i++) {
    photogalleryImages[i].onclick = (function(index) {
      return function(event) {
        event.preventDefault();
        location.hash = '#photo/' + gallery.returnSrc(index);
      };
    })(i);
  }

  onHashChange();
  window.addEventListener('hashchange', onHashChange);
});
