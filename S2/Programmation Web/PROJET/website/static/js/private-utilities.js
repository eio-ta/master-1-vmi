$(document).ready(function() {
    function update_title_() {
        if(document.getElementById("message-title").innerHTML.toLowerCase() == "all messages") {
            document.getElementById("number-message").innerHTML = update_message_number()['all'];
        } else if(document.getElementById("message-title").innerHTML.toLowerCase() == "shared messages") {
            document.getElementById("number-message").innerHTML = update_message_number()['shared'];
        } else {
            document.getElementById("number-message").innerHTML = update_message_number()['deleted'];
        }
    }

    // fired when view message is clicked
    $('.message_click').click(function(event) {
        event.preventDefault();
        // get the id of the message
        var id_message = $(this).attr("id-message")
        $("#delete-message-btn").attr("id-message-delete", id_message)

        data = {
            id: id_message
        }

        $.ajax({
            url: "get_message",
            type: 'GET',
            data: data,
            success: function(data) {
                if (data.success) {
                    var message = data.messages
                    console.log(message)
                    $("#message-shared").val(message.message)
                    $('#date-form').val(message.date)
                    $('#indice-shared-message').val(message.indice)

                    var stats = message.stats

                    $("#stats-board-game tr").remove()

                    stats.forEach(stat => {
                        var el = '<tr>' +
                                    '<td>' + stat.player + '</td>' +
                                    '<td>' + stat.total_tries + '</td>' +
                                    '<td>' + stat.positive_tries + '</td>' +
                                    '<td>' + stat.negative_tries + '</td>' +
                                    '<td>' + (stat.won ? "Yes" : "No") + '</td>' +
                                    '</tr>'

                        $("#stats-board-game").append(el)
                    });
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
        $('#see-message').modal('show');
    });

    // fired when the create message button is clicked
    $('#create-message').click(function(event) {
        event.preventDefault();
        var message = $('#text-new-message').val()
        var indice = $('#indice-new-message').val()
        var username = $('#username').attr("username")

        var data = {
            "message": message,
            "indice": indice,
            "createur_username": username
        }

        console.log("data", data)

        $.ajax({
            url: "save_message",
            type: 'POST',
            data: data,
            success: function(data) {
                if (data.success) {
                    // Empty and Hide the modal
                    $('#text-new-message').val("")
                    $('#indice-new-message').val("")
                    $('#add-message').modal('hide');
        
                    var messages = JSON.parse(data.messages)

                    messages.forEach(message_data => {
                        var message_ = message_data.fields
                        var message = message_.message
                        var date = message_.date
                        var is_deleted = message_.deleted

                        var bottom = ''
                        var class_delete = ''
                        
                        if(!is_deleted) {
                            bottom = '<div class="overlay" >' 
                                        + '<span style="cursor: pointer;" id-message="' + message_data.pk + '"  class="message_click material-symbols-outlined">auto_fix</span>' 
                                        + '<div style="margin-top: 5px;">' 
                                            + '<a href="" target="_blank" class="btn btn-info">' 
                                            +       ' <i style="font-size: 10px;" class="fa-brands fa-twitter text-white"></i>' 
                                            + '</a>&nbsp;' 
                                            + '<a href="" target="_blank" class="btn btn-primary">' 
                                            +       '<i style="font-size: 10px;" class="fa-brands fa-facebook"></i>' 
                                            + '</a>&nbsp;' 
                                            + '<a href="" target="_blank" class="btn btn-success">' 
                                            +       '<i style="font-size: 10px;" class="fa-brands fa-whatsapp"></i>' 
                                            + '</a>&nbsp;' 
                                            + '<button onclick="copy_link(\''+ message_.lien +'\')" class="btn btn-secondary">' 
                                            +       '<i style="font-size: 10px; color:black;" class="fa-sharp fa-solid fa-share-from-square"></i>' 
                                            + '</button>' 
                                        + '</div>' 
                                    + '</div>' 
                            class_delete = 'message-share'
                        } else {
                            class_delete = 'message-remove'
                        }

                        var dot = "..."
                        var no_dot = ""

                        $("#message-galery").append(
                            '<li class="message '+ class_delete +'">' +
                                '<h4 class="hp-text-h4">'+ message.slice(0, 13) + (message.length > 13 ? dot : no_dot)  +'</h4>' +
                                '<br>' +
                                '<div style="display: inline-block;">' +
                                    '<span>0 </span><span><i style="color: rgb(0, 168, 98);" class="fa-solid fa-flag-checkered"></i></span>&nbsp;&nbsp;' +
                                    '<span>0% </span><span><i style="color: rgb(112, 172, 0);" class="fa-solid fa-arrow-trend-up"></i></span>&nbsp;&nbsp;' +
                                    '<span>0% </span><span><i style="color: red;" class="fa-solid fa-arrow-trend-down"></i></span>' +
                                '</div>' +
                                '<br>' +
                                '<div style="display: inline-block; margin-top: 5px;">' +
                                    '<span>0 </span><span><i style="color: blue;" class="fa-solid fa-user"></i></span>&nbsp;&nbsp;' +
                                    '<span>0 </span><span><i style="color: green;" class="fa-solid fa-trophy"></i></span>&nbsp;&nbsp;' +
                                    '<span>0 </span><span><i style="color: red;" class="fa-sharp fa-solid fa-circle-xmark"></i></span>&nbsp;&nbsp;' +
                                '</div>' +
                                '<p class="hp-text-p" style="color: grey; font-size: small; margin-top: 20px;">' + formatDate(date) + '</p>' +
                                bottom +
                            '</li>'
                        )
                    });

                    // trigger a click on shared message menu
                    $("#message-share").click()
                    
                    // Display a success notification
                    create_toast("Your message has been saved successfully.", "linear-gradient(to right, #00b09b, #96c93d)")
                    
                    update_title_()
                } else {
                    // Display an error message
                    alert('Failed to save data. Please try again.');
                }
            },
            error: function() {
                // Display an error message
                alert('Failed to save data. Please try again.');
            }
        });
    });

    // handle delete message event
    $('#delete-message-btn').click(function(event) {
        event.preventDefault()
        var id_message = $(this).attr("id-message-delete")

        console.log("id message to delete", id_message)

        data = {
            "id_message": id_message
        }

        $.ajax({
            url: "delete_message",
            type: 'POST',
            data: data,
            success: function(data) {
                console.log(data)
                if (data.success) {
                    create_toast("Your message has been deleted successfully.", "linear-gradient(to right, #00b09b, #96c93d)")
                    
                    $('#see-message').modal('hide');
                    $('#message-' + id_message).removeClass("message-share")
                    $('#message-' + id_message).addClass("message-remove")

                    update_title_()
                    $("#message-remove").click()
                    $('#message-' + id_message + " .overlay").remove()
                    
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
    })
})