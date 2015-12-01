/**
 * Created by Julia on 27.11.2015.
 */
'use strict';
/* global reviews: true */
(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var container = document.querySelector('.reviews-list');
  reviewsFilter.classList.add('invisible');

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
    var element;
    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    element.querySelector('.review-rating').textContent = data.rating;
    element.querySelector('.review-text').textContent = data.description;

    var defaultAuthor = element.querySelector('.review-author');
    var avatarImage = new Image(124, 124);
    var IMAGE_TIMEOUT = 10000;

    var imageLoadTimeout = setTimeout(function() {
      avatarImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    avatarImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.replaceChild(avatarImage, defaultAuthor);
    };

    avatarImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    avatarImage.src = data.author.picture;
    return element;
  }
  reviewsFilter.classList.remove('invisible');
})();
