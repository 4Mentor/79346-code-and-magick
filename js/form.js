'use strict';
(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formElement = formContainer.querySelector('.review-form');
  var formReviewName = formElement['review-name'];
  var formReviewText = formElement['review-text'];
  var reviewMark1 = formElement['review-mark-1'];
  var reviewMark2 = formElement['review-mark-2'];
  var reviewMark3 = formElement['review-mark-3'];
  var reviewMark4 = formElement['review-mark-4'];
  var reviewMark5 = formElement['review-mark-5'];
  var reviewFields = formElement.querySelector('.review-fields');
  var reviewFieldsName = reviewFields.querySelector('.review-fields-name');
  var reviewFieldsText = reviewFields.querySelector('.review-fields-text');
  var reviewSubmit = formElement.querySelector('.review-submit');

  formReviewName.required = true;
  formReviewText.required = false;
  reviewSubmit.disabled = true;
  reviewFieldsText.classList.add('invisible');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function requiredOrNotButton(NameField, TextField) {
    var contentName = NameField.value;
    var contentText = TextField.value;
    if ((contentText.length !== 0 || !formReviewText.required) && contentName.length !== 0) {
      reviewFields.classList.add('invisible');
      reviewSubmit.disabled = false;
    } else {
      reviewFields.classList.remove('invisible');
      reviewSubmit.disabled = true;
    }
  }

  reviewMark1.onclick = function() {
    formReviewText.required = true;
    reviewFieldsText.classList.remove('invisible');
    requiredOrNotButton(formReviewName, formReviewText);
  };

  reviewMark2.onclick = function() {
    formReviewText.required = true;
    reviewFieldsText.classList.remove('invisible');
    requiredOrNotButton(formReviewName, formReviewText);
  };

  reviewMark3.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton(formReviewName, formReviewText);
  };

  reviewMark4.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton(formReviewName, formReviewText);
  };

  reviewMark5.onclick = function() {
    formReviewText.required = false;
    reviewFieldsText.classList.add('invisible');
    requiredOrNotButton(formReviewName, formReviewText);
  };

  formReviewName.onchange = function() {
    var contentName = formReviewName.value;
    if (contentName.length !== 0) {
      reviewFieldsName.classList.add('invisible');
    } else {
      reviewFieldsName.classList.remove('invisible');
    }
    requiredOrNotButton(formReviewName, formReviewText);
  };

  formReviewText.onchange = function() {
    var contentText = formReviewText.value;
    if (contentText.length !== 0 || !formReviewText.required) {
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
    }
    requiredOrNotButton(formReviewName, formReviewText);
  };
})();
