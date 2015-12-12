/**
 * Created by Julia on 12.12.2015.
 */
'use strict';
( function() {
  function Review(data) {
    this._data = data;
  }

  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');
    if ('content' in template) {
      this.element = template.content.children[0].cloneNode(true);
    } else {
      this.element = template.children[0].cloneNode(true);
    }
    this.element.querySelector('.review-rating').textContent = this._data.rating;
    this.element.querySelector('.review-text').textContent = this._data.description;

    var defaultAuthor = this.element.querySelector('.review-author');
    defaultAuthor.title = this._data.author.name;
    var avatarImage = new Image(124, 124);
    var IMAGE_TIMEOUT = 10000;

    var imageLoadTimeout = setTimeout(function() {
      avatarImage.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_TIMEOUT);

    avatarImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      avatarImage.classList.add('review-author');
      this.element.replaceChild(avatarImage, defaultAuthor);
    }.bind(this);

    avatarImage.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    avatarImage.src = this._data.author.picture;
    avatarImage.title = this._data.author.name;
  };

  window.Review = Review;
})();
