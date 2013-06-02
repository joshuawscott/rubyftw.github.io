function urlParam(name) { return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null; }

$(document).ready(function () {
  var code = urlParam('code');

  if (sessionStorage.github_token) {

    var github = new Github({
      token: sessionStorage.github_token,
      auth: "oauth"
    });

    console.log(github.getUser());

  } else if (code) {
    // Preflight
    $.ajax({
      type: 'OPTIONS',
      url:  'https://api.github.com',

      success: function() {

        $.ajax({
          type:       'POST',
          url:        'https://github.com/login/oauth/access_token',
          dataType:   'json',

          data:       { 'code': code },

          success:    function(data) {
                        token = data.access_token;
                        sessionStorage.github_token = token;
                      }
        });

      }
    });
  }
});
