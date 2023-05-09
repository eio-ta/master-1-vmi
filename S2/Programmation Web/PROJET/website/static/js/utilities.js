function formatDate(date) {
    date = new Date(date)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'p.m.' : 'a.m.';
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
}

function copy_link(link) {
    console.log("link", link)
    var full_link = "127.0.0.1:8000/game?uid=" + link
    // Create a temporary textarea to hold the text
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = full_link;

    // Append the textarea to the DOM
    document.body.appendChild(tempTextArea);

    // Select the text in the textarea
    tempTextArea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextArea);

    create_toast("The URL has been copied to clipboard successfully.", "linear-gradient(to right, #00b09b, #96c93d)")
}

function create_toast(message, style) {
    Toastify({
        text: message,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: style,
        },
        onClick: function(){} // Callback after click
    }).showToast();
}    