'use strict';
/* global define: true */

define(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var formElement = formContainer.querySelector('.review-form');
  var formReviewName = formElement['review-name'];
  var formReviewText = formElement['review-text'];

  var reviewMark = document.getElementsByName('review-mark');

  var reviewMark1 = formElement['review-mark-1'];
  var reviewMark2 = formElement['review-mark-2'];
  var reviewMark3 = formElement['review-mark-3'];
  var reviewMark4 = formElement['review-mark-4'];
  var reviewMark5 = formElement['review-mark-5'];

  var reviewFields = formElement.querySelector('.review-fields');
  var reviewFieldsName = reviewFields.querySelector('.review-fields-name');
  var reviewFieldsText = reviewFields.querySelector('.review-fields-text');
  var reviewSubmit = formElement.querySelector('.review-submit');

  var cookieName = docCookies.getItem('name');
  var cookieMark = docCookies.getItem('mark');

  /**
   * Функция смотрит валидны ли введенные в форму данные.
   * Если валидны - делает кнопку отправки формы активной,
   * если нет - деактивирует кнопку.
   * @function
   */
  function requiredOrNotButton() {
    var contentName = formReviewName.value;
    var contentText = formReviewText.value;
    if ((contentText.length !== 0 || !formReviewText.required) && contentName.length !== 0) {
      reviewFields.classList.add('invisible');
      reviewSubmit.disabled = false;
    } else {
      reviewFields.classList.remove('invisible');
      reviewSubmit.disabled = true;
    }
  }

  /**
   * Функция проверяет необходимо ли для валидности формы наличие отзыва
   * и написан ли он. В зависимости от ответа на эти вопросы меняет поле подсказок
   * и состояние кнопки отправки формы.
   * @function
   */
  function fillReviewText() {
    var contentText = formReviewText.value;
    if (contentText.length !== 0 || !formReviewText.required) {
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
    }
    requiredOrNotButton();
  }

  reviewSubmit.disabled = true;

  /**
   * Обработка события клика по кнопке "Добавить свой"
   * @param {Event} evt
   */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    if (cookieName) {
      formReviewName.value = cookieName;
      reviewFieldsName.classList.add('invisible');
      formReviewText.focus();
      requiredOrNotButton();
    } else {
      formReviewName.focus();
      formReviewName.required = true;
    }
    if (cookieMark) {
      reviewMark3.checked = false;
      reviewMark[cookieMark - 1].checked = true;
      if (cookieMark < 2) {
        formReviewText.required = true;
        fillReviewText();
      } else {
        formReviewText.required = false;
        reviewFieldsText.classList.add('invisible');
        requiredOrNotButton();
      }
    }
  };

  /**
   * Обработка события клика по кнопке, закрывающей форму
   * @param {Event} evt
   */
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  reviewMark1.onclick = function() {
    formReviewText.required = true;
    fillReviewText();
  };

  reviewMark2.onclick = function() {
    formReviewText.required = true;
    fillReviewText();
  };

  reviewMark3.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton();
  };

  reviewMark4.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton();
  };

  reviewMark5.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton();
  };

  formReviewName.onchange = function() {
    var contentName = formReviewName.value;
    if (contentName.length !== 0) {
      reviewFieldsName.classList.add('invisible');
    } else {
      reviewFieldsName.classList.remove('invisible');
    }
    requiredOrNotButton();
  };

  formReviewText.onchange = fillReviewText;

  formElement.onsubmit = function() {
    /**
     * Постоянная, равная количеству миллисекунд прошедших
     * с моего последнего дня рождения
     * @const {number}
     */
    var MY_LAST_BD = +new Date(2015, 6, 27);
    var expDate = (+Date.now() * 2 - MY_LAST_BD) / 1000;
    var valueCurrentRadio;
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        valueCurrentRadio = reviewMark[i].value;
        break;
      }
    }
    docCookies.setItem('mark', valueCurrentRadio, expDate);
    docCookies.setItem('name', formReviewName.value, expDate);
  };
});
