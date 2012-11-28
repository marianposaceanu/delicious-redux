// Copyright (c) 2012 Marian Posaceanu
// Use of this source code is governed by a BSD-style
Zepto( function($) {
  if(localStorage.getItem('base_64_login_string')) {
    $("#login_form").html("Login saved "+localStorage.getItem('base_64_login_string'));

    $("#bookmark_api_call").click( function(e) {
      e.preventDefault();

      make_bookmark_api_call();
    });
  } else {
    $("#login_button").click( function(e) {
      e.preventDefault();

      var username = $("#username").val();
      var password = $("#password").val();

      base_64_encoded_string = btoa(username+":"+password);

      localStorage.setItem('base_64_login_string', base_64_encoded_string);

      $("#login_form").html("Login saved "+localStorage.getItem('base_64_login_string'));

    });
  }
});

var make_bookmark_api_call = function() {
  var options = {
    type: 'POST',
    url: 'https://api.del.icio.us/v1/posts/add',
    data: {
      url: 'http://en.wikipedia.org/wiki/Data,_context_and_interaction',
      description: 'Data, context and interaction (DCI) is a paradigm'
    },
    headers: { 'Authorization' : 'Basic ' + localStorage.getItem('base_64_login_string') }
  };

  var xhr = $.ajax(options);
  console.log(xhr);
}

