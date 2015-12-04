/**
 * Created by Julia on 27.11.2015.
 */
'use strict';
(function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var container = document.querySelector('.reviews-list');
  reviewsFilter.classList.add('invisible');

  //JSONP
  /*
  function addScript(src) {
    var elem = document.createElement('script');
    elem.src = src;
    document.head.appendChild(elem);
  }
  addScript('data/reviews.js');
*/

  // XHR

  var reviews;
  var drawingReviews = function() {
    reviews.forEach(function(review) {
      var element = getElementFromTemplate(review);
      container.appendChild(element);
    });

    function getElementFromTemplate(data) {
      var template = document.querySelector('#review-template');
      var element;
      if ('content' in template) {
        element = template.content.children[0].cloneNode(true);
      } else {
        element = template.children[0].cloneNode(true);
      }
      element.querySelector('.review-rating').textContent = data.rating;
      element.querySelector('.review-text').textContent = data.description;

      var defaultAuthor = element.querySelector('.review-author');
      defaultAuthor.title = data.author.name;
      var avatarImage = new Image(124, 124);
      var IMAGE_TIMEOUT = 10000;

      var imageLoadTimeout = setTimeout(function() {
        avatarImage.src = '';
        element.classList.add('review-load-failure');
      }, IMAGE_TIMEOUT);

      avatarImage.onload = function() {
        clearTimeout(imageLoadTimeout);
        avatarImage.classList.add('review-author');
        element.replaceChild(avatarImage, defaultAuthor);
      };

      avatarImage.onerror = function() {
        element.classList.add('review-load-failure');
      };

      avatarImage.src = data.author.picture;
      avatarImage.title = data.author.name;
      return element;
    }

    reviewsFilter.classList.remove('invisible');
  };

  var getReviews = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/reviews.json', true);
    xhr.timeout = 10000;
    //написано добавлять прелоадер блоку reviews но у нас же нет его ...
    container.classList.add('reviews-list-loading');

    xhr.onload = function() {
      var stringData = xhr.responseText;
      reviews = JSON.parse(stringData);
      container.classList.remove('reviews-list-loading');
      //отрисовка отзывов
      drawingReviews();
    };

    xhr.ontimeout = container.classList.add('reviews-load-failure');
    xhr.onerror = container.classList.add('reviews-load-failure');
    xhr.send();
  };
  getReviews();
})();
