/**
 * Created by Julia on 27.11.2015.
 */
'use strict';
/* global reviews: true */
(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');
  var container = document.querySelector('.reviews-list');

  reviews.forEach(function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  /**
   * @param {Object} data
   * @return {Element}
   */
  function getElementFromTemplate(data) {
    var template = document.querySelector('#review-template');
    if ('content' in template) {
      var element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    element.querySelector('.review-rating').textContent = data.rating;
    element.querySelector('.review-text').textContent = data.description;

    var avatarImage = new Image();

    var imageLoadTimeout = setTimeout(function() {
      avatarImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    avatarImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      //тут может не работает потому что у меня адрес неправильный, мне же надо выйти из папки джс верно? Я вообще не очень понимаю что здесь творится с этими экранизациями
      element.style.avatarImage = 'url(\'' + avatarImage.src + '\')';
    };
    avatarImage.onerror = function() {
      element.classList.add('review-load-failure');
    };
    avatarImage.src = '/' + data.picture;

    var IMAGE_TIMEOUT = 10000;


    return element;
  }
})();
