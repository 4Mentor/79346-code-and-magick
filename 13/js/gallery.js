/**
 * Created by Julia on 12.12.2015.
 */
'use strict';
( function() {
  function Gallery() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._PreviousButton = document.querySelector('.overlay-gallery-control-left');
    this._NextButton = document.querySelector('.overlay-gallery-control-right');

    this._onLeftClick = this._onLeftClick.bind(this);
    this._onRightClick = this._onRightClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  }

  // показать галерею и добавить подписки на события, которые отслеживает галерея
  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
    this._PreviousButton.addEventListener('click', this._onLeftClick);
    this._NextButton.addEventListener('click', this._onRightClick);
    window.addEventListener('keydown', this._onDocumentKeyDown);

  };

  // спрятать галерею и убрать подписки на события, которые отслеживает галерея
  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');

    this._PreviousButton.removeEventListener('click', this._onLeftClick);
    this._NextButton.removeEventListener('click', this._onRightClick);
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
  };

  Gallery.prototype._onLeftClick = function() {
    console.log('I am work');
  };

  Gallery.prototype._onRightClick = function() {
    console.log('I am work, too');
  };

  var gallery = new Gallery();
  var photogallery = document.querySelector('.photogallery');

  function _onClick(event) {
    event.preventDefault();
    gallery.show();
  }

  photogallery.onclick = function(event) {
    var clickedElement = event.target;
    if (clickedElement.tagName === 'IMG') {
      clickedElement.addEventListener('click', _onClick);
    }
  };
})();
