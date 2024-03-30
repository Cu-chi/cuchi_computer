document.addEventListener("chat.incognito.net", () => {
    document.getElementById("addresses-content").innerHTML = `
<div id="cin-connection">
    <h4 id="cin-title"></h4>
    <input id="cin-connection-username" placeholder="username" type="text" maxlength="16">
    <button id="cin-connect"></button>
</div>

<div id="cin-content">
    <div id="cin-messages">
    </div>
    <div id="cin-send-box">
        <input id="cin-message-input" placeholder="" type="text" maxlength="255">
        <button id="cin-btn"></button>
    </div>
</div>`;

    document.getElementById("cin-title").innerText = GetLocale("addr_chatincognitonet_connect_title");

    let connectBtn = document.getElementById("cin-connect");
    connectBtn.innerText = GetLocale("addr_chatincognitonet_connect");

    let usernameElem = document.getElementById("cin-connection-username");
    usernameElem.placeholder = GetLocale("addr_chatincognitonet_username");

    let sendBtn = document.getElementById("cin-btn");
    sendBtn.innerText = GetLocale("addr_chatincognitonet_send");
    document.getElementById("cin-message-input").placeholder = GetLocale("addr_chatincognitonet_msg_placeholder");

    let username = "";
    let connectionElem = document.getElementById("cin-connection");
    let contentElem = document.getElementById("cin-content");
    connectBtn.onclick = () => {
        connectBtn.disabled = true;
        username = usernameElem.value;
        fetch(`https://${GetParentResourceName()}/cinConnect`,
        {
            method: "POST",
            body: JSON.stringify({
                username: username
            })
        }).then(response => response.json()).then(data => {

            if (!data.username) {
                connectBtn.disabled = false;
                return MessageBox("error", "chat.incognito.net", GetLocale("addr_chatincognitonet_connect_taken"));
            }

            connectionElem.style.display = "none";
            contentElem.style.display = "flex";
        });
    };

    const SendMessage = () => {
        let message = input.value;
        fetch(`https://${GetParentResourceName()}/cinMessage`,
        {
            method: "POST",
            body: JSON.stringify({
                message: message
            })
        });
        input.value = "";
    };

    let input = document.getElementById("cin-message-input");
    sendBtn.addEventListener("click", () => SendMessage());

    input.addEventListener("keypress" , (e) => {
        if (e.key === "Enter") SendMessage();
    });

    let messagesContainer = document.getElementById("cin-messages");
    window.addEventListener("message", (event) => {
        if (event.data.type === "chat.incognito.net") {
            let messageContainer = document.createElement("div");
            messageContainer.className = "cin-msg";
            let date = new Date();
            const dateFormat = GetLocale("date_format");
            messageContainer.innerHTML = `
<p><span>${event.data.username}</span><span>${date.toLocaleTimeString(dateFormat)}</span></p>
<p>${event.data.message}</p>`;

            messagesContainer.appendChild(messageContainer);
            messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
        }
    });
});

document.addEventListener("addressesApplicationClose:chat.incognito.net", () => {
    fetch(`https://${GetParentResourceName()}/cinDisconnect`, { method: "POST" });
});
