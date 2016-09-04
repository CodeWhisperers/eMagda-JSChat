var sess;

var submitMessage = function(msg) {
    $('.msg_input').val('');
    if (msg != '') {
        $('.msg_input').attr('placeholder', '');
        $('<div class="msg_b">' + msg + '</div>').insertBefore('.msg_push');
        $('<div id="searching-ellipsis"><span>●</span><span>●</span><span>●</span></div>').insertBefore('.msg_push');
        $.get("https://bot.cw.yield.ro/chatbot/conversation_start.php?say=" + encodeURIComponent(msg) + "&convo_id=" + sess + "&bot_id=1&format=json", function (data) {
            $('#searching-ellipsis').remove();
            var answer = JSON.parse(data);
            $('<div class="msg_a">' + answer.botsay + '</div>').insertBefore('.msg_push');
            $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        });
    }
    $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
    setTimeout((function () {
        $('.msg_input').val('');
    }), 150);
};


$(document).ready(function () {

    var bot = $.ajax({type: "GET", url: "https://bot.cw.yield.ro/gui/jquery/", async: false}).responseText;
    sess = (bot.split('convo_id" value="')[1]).split('"')[0];
    
    $('.chat_head').click(function () {
        $('.chat_body').slideToggle('slow');
        $('.msg_input').focus();
        $('.msg_box #pop').qtip('destroy', true)
    });
    $('.msg_head').click(function () {
        $('.msg_wrap').slideToggle('slow');
        $('.msg_input').focus();
        $('.msg_box #pop').qtip('destroy', true)
    });

    $('.close').click(function () {
        $('.msg_box').hide();
    });

    $('#speech_demo_record_button').click(function (e) {
        e.preventDefault();

        if($('.msg_wrap').css('display') == 'block') {
            e.stopPropagation();
        }



    });

    $('.user').click(function () {

        $('.msg_wrap').show();
        $('.msg_box').show();
    });

    $('textarea').keypress(
        function (e) {
            if (e.keyCode == 13) {
                var msg = $(this).val();
                submitMessage(msg);
            }
        });

    $('.msg_box #pop').qtip({
        position: {
            my: 'bottom right ',
            at: 'top left',
            adjust: {
                method: 'Shift'
            }
        },
        show: true,
        hide: false,
        events: {
            focus: function (event, api) {
                api.set('position.adjust.y', -5);
            },
            blur: function (event, api) {
                api.set('position.adjust.y', 0);
            }
        }
    });

    $('#normal').click(function (){$('#mainStyle').attr('href','css/style.css');$('.msg_input').focus();});
    $('#bf').click(function (){$('#mainStyle').attr('href','css/bf.css');$('.msg_input').focus();});
    $('#alt').click(function (){$('#mainStyle').attr('href','css/alt.css');$('.msg_input').focus();});
    $('#cat').click(function (){$('#mainStyle').attr('href','css/cat.css');$('.msg_input').focus();});
    $('#prod').click(function (){$('#mainStyle').attr('href','css/prod.css');$('.msg_input').focus();});

});

