require('./stylus/main.styl');

import $ from 'jquery';

$(function () {

  $.ajax({
    method: "POST",
    url: "create-user",
    data: {
      username: "John1",
      password: "qwerty12"
    }
  }).done(function (msg) {
    alert("done: " + msg);
  });

});