/**
 * Created by Julia on 12.12.2015.
 */
/* global gallery: true */
'use strict';
( function() {
  /**
   * Конструктор галереи
   * @constructor
   */
  function Gallery() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._previousButton = document.querySelector('.overlay-gallery-control-left');
    this._nextButton = document.querySelector('.overlay-gallery-control-right');
    this._currentPicture = 0;
    this._photos = [];

    this._onLeftClick = this._onLeftClick.bind(this);
    this._onRightClick = this._onRightClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  }

  /**
   * показать галерею и добавить подписки на события, которые отслеживает галерея
   */
  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
    this._previousButton.addEventListener('click', this._onLeftClick);
    this._nextButton.addEventListener('click', this._onRightClick);
    window.addEventListener('keydown', this._onDocumentKeyDown);

  };

  /**
   * спрятать галерею и убрать подписки на события, которые отслеживает галерея
   */
  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');

    this._previousButton.removeEventListener('click', this._onLeftClick);
    this._nextButton.removeEventListener('click', this._onRightClick);
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  /**
   * Метод принимает на вход массив объектов Photo и сохраняет его
   * @param {Array} arrayPhoto
   */
  Gallery.prototype.setPictures = function(arrayPhoto) {
    this._photos = arrayPhoto;
  };

  /**
   * Возвращает адрес выбранного элемента
   * @param {number} index
   * @returns {string}
   */
  Gallery.prototype.returnSrc = function(index) {
    return this._photos[index].src;
  };

  /**
   * Метод берет фотографию с переданным индексом из массива фотографий
   * и отрисовывает её в галерее
   * @param {number|string} data
   */
  Gallery.prototype.setCurrentPicture = function(data) {

    var preview = document.querySelector('.overlay-gallery-preview');
    var numberCurrent = document.querySelector('.preview-number-current');
    var numberTotal = document.querySelector('.preview-number-total');
    var photo;
    if (typeof data === 'number') {
      this._currentPicture = data;
      photo = this._photos[data];
    } else if (typeof data === 'string') {
      //каким-то магическим образом я нахожу фотографию по пути
      photo = '';
    }

    var oldPhoto = preview.querySelector('img');
    if (oldPhoto) {
      preview.removeChild(oldPhoto);
    }
    preview.appendChild(photo.getPhoto());
    //тут у меня все ломается
    var numCur = data + 1;
    var numTot = this._photos.length;
    numberCurrent.innerHTML = '' + numCur;
    numberTotal.innerHTML = '' + numTot;
  };

  /**
   * Обработчик события клика по кнопке, закрывающей галерею
   * @private
   */
  Gallery.prototype._onCloseClick = function() {
    location.hash = '';
  };

  /**
   * Обработчик события клика на Esc
   * @param {Event} event
   * @private
   */
  Gallery.prototype._onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
    if (event.keyCode === 37) {
      this._onLeftClick();
    }
    if (event.keyCode === 39) {
      this._onRightClick();
    }
  };

  /**
   * Обработчик события клика по кнопке "предыдущее фото" в галерее
   * @private
   */
  Gallery.prototype._onLeftClick = function() {
    if (this._currentPicture > 0) {
      this.setCurrentPicture(this._currentPicture - 1);
    }
  };

  /**
   * Обработчик события клика по кнопке "следующее фото" в галерее
   * @private
   */
  Gallery.prototype._onRightClick = function() {
    if (this._currentPicture < this._photos.length - 1) {
      this.setCurrentPicture(this._currentPicture + 1);
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

  //на каком этапе я заполняю стринг ...
  window.addEventListener('hashchange', function(string) {
    var REG_EXP = /#photo\/(\S+)/;
    if (string.match(REG_EXP)) {
      gallery.show();
      gallery.setCurrentPicture(string);
    } else {
      gallery.hide();
    }
  });
  window.Gallery = Gallery;
})();
