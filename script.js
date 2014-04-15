$(document).ready(function(){

    var profile = [];

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

                var userFrom = response.location;

                (function() {

                    if (userFrom == null) {
                        userFrom = '';
                    }

                    profile.push(
                            '<li><div id="line"></div><div id="whiteline"></div><div class="photo"><a href="' + response.url + '" target="_blank"><img src="' + response.avatar_url + '" class="avatar" alt=""></a></div><div class="info"><a href="' + response.url + '" target="_blank"><h3 id="name">' + response.name + '</h3></a><p id="location">' + userFrom + '</p></div></li>'
                    );

                }());

                var parent = response.drafted_by_player_id;

                if (parent != null){
                    getParentsFor(parent);

                } else {
                    var html = [];
                    for (i=profile.length; i>=0; i--){
                        html.push(profile[i]);
                    }

                    $('#playerProfile').html(html.join(''));
                }
            }
        });
    };

    getParentsFor('rork'); // Dribbble Player's username or ID

});