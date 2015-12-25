/**
 * Created by Julia on 12.12.2015.
 */
'use strict';
/* global define: true */
define(function() {
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
    location.hash = '';

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
    return this._photos[index].getSrc();
  };

  /**
   * Метод берет фотографию с переданным индексом из массива фотографий
   * и отрисовывает её в галерее
   * @param {number|string} data
   */
  Gallery.prototype.setCurrentPicture = function(data) {
    var photo;
    var numCur;
    if (typeof data === 'number') {
      this._currentPicture = data;
      photo = this._photos[data];
    } else if (typeof data === 'string') {
      this._photos.forEach(function(element, i) {
        if (element.getSrc() === data) {
          photo = element;
          numCur = i;
        }
      });
    }
    this._currentPicture = numCur;
    this._renderPhoto(photo, numCur);
  };

  Gallery.prototype._renderPhoto = function(photo, numCur) {
    var preview = document.querySelector('.overlay-gallery-preview');
    var numberCurrent = document.querySelector('.preview-number-current');
    var numberTotal = document.querySelector('.preview-number-total');

    var oldPhoto = preview.querySelector('img');
    if (oldPhoto) {
      preview.removeChild(oldPhoto);
    }
    preview.appendChild(photo.getPhoto());
    numCur = numCur + 1;
    var numTot = this._photos.length;
    numberCurrent.innerHTML = '' + numCur;
    numberTotal.innerHTML = '' + numTot;
  };

  /**
   * Обработчик события клика по кнопке, закрывающей галерею
   * @private
   */
  Gallery.prototype._onCloseClick = function(event) {
    event.preventDefault();
    this.hide();
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
      location.hash = '#photo/' + this.returnSrc(this._currentPicture - 1);
    }
  };

  /**
   * Обработчик события клика по кнопке "следующее фото" в галерее
   * @private
   */
  Gallery.prototype._onRightClick = function() {
    if (this._currentPicture < this._photos.length - 1) {
      location.hash = '#photo/' + this.returnSrc(this._currentPicture + 1);
    }
  };

  return Gallery;
});
