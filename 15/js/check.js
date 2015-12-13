/**
 * Created by Julia on 12.11.2015.
 */
/**
 * Функция для генерации текстов сообщений
 * @param {boolean|number|Object} a
 * @param  {*} b
 * @returns {string}
 */
function getMessage(a,b) {
  var message;

  if (typeof a === "boolean") {
    if (a) {
      message = "Я попал в " + b;
    } else {
      message = "Я никуда не попал";
    }
  }

  else if (typeof a === "number") {
    message = "Я прыгнул на " + a*100 +  " сантиметров";
  }

  else if (typeof a == "object" && typeof b !== "object") {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
      sum += a[i];
    }
    message = "Я прошёл " + sum + " шагов";
  }

  else if (typeof a == "object" && typeof b == "object") {
    var length = 0;
    for (var j = 0; j < a.length; j++) {
      length += a[j]*b[j];
    }
    message = "Я прошёл " + length + " метров";
  }
  return message;
}
