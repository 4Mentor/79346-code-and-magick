/**
 * Created by Julia on 27.11.2015.
 */
/* global Review: true */
'use strict';
(function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var container = document.querySelector('.reviews-list');
  var wantMoreReviews = document.querySelector('.reviews-controls-more');
  var reviews;
  var filteredArray;
  var currentPage = 0;
  var ONE_PAGE = 3;
  var currentFilterId = 0;
  wantMoreReviews.classList.remove('invisible');

  reviewsFilter.classList.add('invisible');
  var filteringReviews = function() {
    filteredArray = reviews.slice();

    function isGood(value) {
      return value.rating > 2;
    }

    function isBad(value) {
      return value.rating < 3;
    }

    function isRecent(value) {
      var currentDate = new Date();
      var reviewDate = new Date(value.date);
      var HALF_OF_YEAR = 3600 * 24 * 183 * 1000;
      return currentDate - reviewDate < HALF_OF_YEAR;
    }

    function compareBadReviews(a, b) {
      return a.rating - b.rating;
    }

    function compareGoodReviews(a, b) {
      return b.rating - a.rating;
    }

    function comparePopularity(a, b) {
      return b.reviewRating - a.reviewRating;
    }

    function compareDate(a, b) {
      var bDate = new Date(b.date);
      var aDate = new Date(a.date);
      return bDate - aDate;
    }

    switch (currentFilterId) {
      case 'reviews-all':
        filteredArray = reviews;
        break;
      case 'reviews-recent':
        filteredArray = filteredArray.filter(isRecent);
        filteredArray = filteredArray.sort(compareDate);
        break;
      case 'reviews-good':
        filteredArray = filteredArray.filter(isGood);
        filteredArray = filteredArray.sort(compareGoodReviews);
        break;
      case 'reviews-bad':
        filteredArray = filteredArray.filter(isBad);
        filteredArray = filteredArray.sort(compareBadReviews);
        break;
      case 'reviews-popular':
        filteredArray = filteredArray.sort(comparePopularity);
        break;
    }
  };

  var drawingReviews = function(pageNumber, remove) {
    if (remove) {
      var renderedElements = container.querySelectorAll('.review');
      [].forEach.call(renderedElements, function(element) {
        container.removeChild(element);
      });
    }
    var fragment = document.createDocumentFragment();

    var from = pageNumber * ONE_PAGE;
    var to = from + ONE_PAGE;
    var pageOfReview = filteredArray.slice(from, to);

    pageOfReview.forEach(function(review) {
      var reviewElement = new Review(review);
      reviewElement.render();
      fragment.appendChild(reviewElement.element);
    });
    reviewsFilter.classList.remove('invisible');
    container.appendChild(fragment);
  };

  var getReviews = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/reviews.json', true);
    xhr.timeout = 10000;
    container.classList.add('reviews-list-loading');
    xhr.onload = function() {
      var stringData = xhr.responseText;
      reviews = JSON.parse(stringData);
      container.classList.remove('reviews-list-loading');
      //предварительная фильтрация отзывов
      filteringReviews();
      //отрисовка отзывов
      drawingReviews(currentPage, false);
    };
    xhr.ontimeout = function() {
      container.classList.add('reviews-load-failure');
    };
    xhr.onerror = function() {
      container.classList.add('reviews-load-failure');
    };
    xhr.send();
  };

  getReviews();

  reviewsFilter.onclick = function(event) {
    currentFilterId = event.target.id;
    currentPage = 0;
    wantMoreReviews.classList.remove('invisible');
    filteringReviews();
    drawingReviews(currentPage, true);
  };

  wantMoreReviews.onclick = function() {
    currentPage += 1;
    filteringReviews();
    if (filteredArray.length <= (currentPage + 1) * ONE_PAGE ) {
      wantMoreReviews.classList.add('invisible');
    }
    drawingReviews(currentPage, false);
  };
})();