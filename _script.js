//Possible test IDs: rork, 14392, 2942, 38531, 1433, 34963

$(document).ready(function(){

    var profile = [];
    var twitList = [];

    var getParentsFor = function(userId){

        jQuery.ajax({
            url: "http://api.dribbble.com/players/"+userId,
            async: false,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                format: "json"
            },

            success: function( response ) {

                var twUser = response.twitter_screen_name;
                var userFrom = response.location;

                (function() {
                    if (userFrom == null) {
                        userFrom = '';
                    }

                    profile.push(
                            '<li><div id="line"></div><div id="whiteline"></div><div class="photo"><a href="' + response.url + '" target="_blank"><img src="' + response.avatar_url + '" class="avatar" alt=""></a></div><div class="info"><a href="' + response.url + '" target="_blank"><h3 id="name">' + response.name + '</h3></a><p id="location">' + userFrom + '</p></div></li>'
                    );

                    if (twUser == null) {
                        twUser = '';
                    } else {
                        twitList.push('@'+twUser);
                    }

                }());

                var parent = response.drafted_by_player_id;
                if (parent != null){
                    getParentsFor(parent);

                } else {
                    var html = [];
                    for (i=profile.length;i>=0;i--){
                        html.push(profile[i]);
                    }

                    twitList.splice(0, 1);
                    var twitTo = twitList.join(', ');
                    var tweet = 'Guys! You\'re my @Dribbble ansestors '+twitTo+' via goo.gl/lJXdYC #DribbbleGenealogy';

                    $('#playerProfile').html(html.join(''));
                    $('#playerProfile').slideDown(3000, 'swing');

                    $('#footer').addClass('footerAfterload');
                    $('#description').addClass('afterload');
                    $('#product p').hide();
                    $('#product #title').css('font-size', '1em');
                    $('#product #title').css('margin-top', '15px');
                    $('#product form').css('margin-top', '20px');
                    $('#share p').html(tweet);
                    $('#tweettext').html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + tweet + '" data-via="didelico" data-count="none" data-url="goo.gl/lJXdYC" data-counturl="http://js.ework.me/code/dribbble-genealogy">Tweet it</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
                    $('#share').delay(6000).slideDown(1000);
                    $('#tw').delay(8000).slideDown(600);

                    // now refresh the lists
                    profile = [];
                    twitList = [];
                }
            }
        });
    };

    $('#submit').click(function (e) {
        e.preventDefault();

        var user = $('#user').val();
        if (user !== "") {

            getParentsFor(user);
            $('#product span').hide();

        } else {
            $('#product span').html("Enter a Dribbble Player username!");
            $('#product span').css('color', 'rgba(255, 83, 150, 1)');
        }
    });

    $('#share #tw').mouseover(function() {
        $( this ).css( 'background-color', 'rgba(47, 47, 47, 0.98)' );
    });
    $('#share #tw').mouseleave(function() {
        $( this ).css( 'background-color', '#EEDF1E' );
    });
});