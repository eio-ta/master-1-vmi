// get the number of messages shared, deleted and total
function update_message_number() {
    var message_shared = $(".message-share").length
    var message_deleted = $(".message-remove").length
    var all_message = $(".message-galery li").length
    
    return {"shared": message_shared, "deleted": message_deleted, "all": all_message}
}

$(document).ready(function() {
    
    document.getElementById("number-message").innerHTML = update_message_number()['shared'];

    document.getElementById("open-side-nav").onclick = function() {
        var side_nav = document.querySelector('.private-side-nav');
        side_nav.style.width = '250px';
        var body = document.querySelector('.main-content');
        body.style.marginLeft = '250px';
        var icon = document.getElementById('open-side-nav');
        icon.style.display = 'none';
    }

    document.getElementById("close-side-nav").onclick = function() {
        var side_nav = document.querySelector('.private-side-nav');
        side_nav.style.width = '0';
        var body = document.querySelector('.main-content');
        body.style.marginLeft = '0';
        var icon = document.getElementById('open-side-nav');
        icon.style.display = 'inline';
    }

    const now = new Date();
    const dateLocale = now.toLocaleDateString();
    const date = document.getElementById("date-form");
    date.placeholder = dateLocale;

    document.getElementById("message-remove").onclick = function() {
        var mes_rem = document.getElementsByClassName('message-remove');
        for(i=0; i<mes_rem.length; i++) {
            mes_rem[i].style.display = 'inline';
        }
        var mes_sha = document.getElementsByClassName('message-share');
        for(i=0; i<mes_sha.length; i++) {
            mes_sha[i].style.display = 'none';
        }
        document.getElementById("message-title").innerHTML = "Deleted messages";
        document.getElementById("number-message").innerHTML = update_message_number()['deleted'];
    }

    document.getElementById("message-share").onclick = function() {
        console.log("message-share")
        console.log("message length:", update_message_number())
        var mes_rem = document.getElementsByClassName('message-remove');
        for(i=0; i<mes_rem.length; i++) {
            mes_rem[i].style.display = 'none';
        }
        var mes_sha = document.getElementsByClassName('message-share');
        for(i=0; i<mes_sha.length; i++) {
            mes_sha[i].style.display = 'inline';
        }
        document.getElementById("message-title").innerHTML = "Shared messages";
        document.getElementById("number-message").innerHTML = update_message_number()['shared'];

    }

    document.getElementById("all-message").onclick = function() {
        console.log("all-message")
        var mes_rem = document.getElementsByClassName('message-remove');
        for(i=0; i<mes_rem.length; i++) {
            mes_rem[i].style.display = 'inline';
        }
        var mes_sha = document.getElementsByClassName('message-share');
        for(i=0; i<mes_sha.length; i++) {
            mes_sha[i].style.display = 'inline';
        }
        document.getElementById("message-title").innerHTML = "All messages";
        document.getElementById("number-message").innerHTML = update_message_number()['all'];
    }
});