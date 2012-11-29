// Copyright (c) 2012 Marian Posaceanu
// Use of this source code is governed by a BSD-style
Zepto( function($) {
  if(localStorage.getItem('base_64_login_string')) {
    $("#login_form").hide();

    $("#tags").focus();

    $("#bookmark_api_call").click( function(e) {
      e.preventDefault();

      make_bookmark_api_call();
    });
  } else {
    $("#bookmark_form").hide();

    $("#username").focus();

    $("#login_button").click( function(e) {
      e.preventDefault();

      var username = $("#username").val();
      var password = $("#password").val();

      if(username != '' && password != '') {
        base_64_encoded_string = btoa(username+":"+password);
        localStorage.setItem('base_64_login_string', base_64_encoded_string);

        $("#login_form").html("Login saved");
      }
    });
  }

  make_slider_for_private();
});

var make_bookmark_api_call = function() {
  chrome.tabs.getSelected(null, function(tab) {
    var options = {
      type: 'POST',
      url: 'https://api.del.icio.us/v1/posts/add',
      data: {
        url         : tab.url,
        description : tab.title,
        shared      : 'no',
        tags        : $("#tags").val()
      },
      headers: { 'Authorization' : 'Basic ' + localStorage.getItem('base_64_login_string') },
      success: function(data) {
        window.close();
      },
      error: function(xhr, type){
        alert('Ajax error!')
      }
    };

    if($("#tags").val() != '') {
      $("#bookmark_form").hide();
      $("#status").show();

      $.ajax(options);
    }
  });
};

var make_slider_for_private = function() {
  $("#slider").click(function(event) {
    if($("#private").val() == 'true') {
      $("#private").val('false');
      $("#slider").css('background-position', '-8px 20px');
    } else {
      $("#private").val('true');
      $("#slider").css('background-position', '-7px 0px');
    }
  });
}

