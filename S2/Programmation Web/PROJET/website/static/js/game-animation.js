$(document).ready(function() {

    /* ANIMATION SQUARE */

    $(function() {
        var sq = $(".square");
        var degree = 0, timer;
        rotate();

        function rotate() {
            sq.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
            sq.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
            timer = setTimeout(function() {
                ++degree; rotate();
            }, 80);
        }
    });



    var currentUrl = window.location.href;



    /* ANIMATION STARTER */
    
    if(currentUrl.includes("loading")) {
        const as = document.getElementById("animation-starter");
        const tmp = ["1...", "2...", "3...", "GO !", ""];
        let index = 0;

        function updateHeading() {
            as.textContent = tmp[index];
            index += 1;
        }

        setInterval(updateHeading, 1000);

        setTimeout(function() {
            var player = $("#layer-1").attr("player")
            var uid = $("#layer-1").attr("uid")
            var game_id = $("#layer-1").attr("game_id")
            var url = "/game?game_start=True&player=" + player + "&uid=" + uid + "&game_id=" + game_id
            window.location.href = url;
        }, 5000);
    }



    /* ANIMATION MESSAGE TO FIND */

    function remplacerCaracteres(texte) {
        var regex = /[a-zA-Z]/g;
        return texte.replace(regex, "_");
    }
      
    var mes = document.getElementById("message").textContent;
    var new_mes = mes.toUpperCase();
    var h1 = document.getElementById('message');
    h1.textContent = new_mes;



    /* ANIMATION LOSE */

    function playMusic(path) {
        var musique = new Audio(path);
        musique.play();
    }

    function vibrate() {
        $('.vibrate-thing').addClass('vibrate');
        setTimeout(function() {
            $('.vibrate-thing').removeClass('vibrate');
        }, 1000);
    }

    function findAllIndices(secret, res, test) {
        let indices = [];
        for(let i = 0; i < secret.length; i++) {
            if(secret[i] === test[0]) {
                let ok = 0;
                let k = 0;
                for(let j = i; j < i+test.length; j++) {
                    if(secret[j] !== test[k]) {
                        ok = 1;
                    }
                    k++;
                }
                if(ok === 0) {
                    indices.push(i);
                }
            }
        }
        return indices;
    }

    function replaceLetters(secret, res, test) {
        let indices = findAllIndices(secret, res, test);
        var chars = res.split("");
        for(let i = 0; i < indices.length; i++) {
            for(let j = indices[i]; j < indices[i] + test.length; j++) {
                chars[j] = secret[j];
            }
        }
        return chars.join("");
    }

    document.getElementById('validate-button').onclick = function() {
        var essai = $('#test-response').val()
        var size = essai.length
        var uid = $("#pseudo_user").attr("uid")
        var game_id = $("#pseudo_user").attr("game")
        var actual_message = document.getElementById('message').textContent.split("");
        actual_message.shift()
        actual_message.pop()
        actual_message = actual_message.join("")

        var data = {
            "essai": essai,
            "uid": uid,
            "game_id": game_id,
            "actual_message": actual_message
        }

        console.log(data)

        if(size !== 0 && size !== 1) {
            $('#test-response').val("")
            // we send the essai to the backend for checks
            $.ajax({
                url: "check_try",
                type: 'POST',
                data: data,
                success: function(data) {
                    if (data.success) {
                        var h = document.getElementById('message');
                        h.textContent = "[" + data.actual.toUpperCase() + "]";

                        var p = document.getElementById('total_points');
                        p.textContent = data.total_points + " pts"

                        var sign = ""
                        var color = ""

                        if(data.points > 0) {
                            sign = "+"
                            color = "#1eff00"
                        } else {
                            color = "#ff1900"
                        }

                        // $(".plus-one")

                        $('<span class="plus-one"/>', {
                            style: 'display:none'
                        })
                        .html(sign + data.points)
                        .css("color", color)
                        .appendTo($('.add-comment'))
                        .fadeIn('1000', function() {
                            var el = $(this);
                            setTimeout(function() {
                                el.remove();
                            }, 2000);
                        });

                        if(data.occurences != 0) {
                            if(data.won) {
                                playMusic('static/js/medias/completion.wav');
                                var div = document.getElementById('background');
                                div.style.backgroundColor = 'white';
                                var div1 = document.getElementById('layer-2');
                                div1.style.display= 'none';
                                var div2 = document.getElementById('layer-3');
                                div2.style.display= 'block';
                                var h1 = document.getElementById('message-f');
                                h1.textContent = "[" + data.actual.toUpperCase() + "]";
                                var p1 = document.getElementById('message-p');
                                p1.textContent = data.total_points + " pts";

                                setTimeout(() => {
                                    window.location.href = "/home"
                                }, 5000);
                            } else {
                                playMusic("static/js/medias/yes.wav");
                            }
                        } else {
                            playMusic("static/js/medias/error.wav");
                            vibrate();
                        }
                    } else {
                        // Display an error message
                        alert('Failed to get data. Please try again.');
                    }
                },
                error: function() {
                    // Display an error message
                    alert('Failed to get data. Please try again.');
                }
            });
        } else {
            alert("Your try should be greater than or equal of size 2.")
        }
    }
});