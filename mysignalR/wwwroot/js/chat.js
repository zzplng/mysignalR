"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();

    document.getElementById("sendButton").disabled = true;
    setTimeout(wait3, 3000);
});

function wait3() {
    document.getElementById('sendButton').disabled = false;
    console.log("dosth");
}

document.getElementById("sendButton1").addEventListener("click", function (event) {

    $.ajax({
        url: "/Home/Dosth",
        success: function (data, status) {
            connection.invoke("SendMessage", "自定义", data).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
        }
    });

});