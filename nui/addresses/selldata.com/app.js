document.addEventListener("selldata.com", () => {
    document.getElementById("addresses-content").innerHTML = `
<div id="selldata">
    <h4 id="selldata-title"></h4>
    <input id="selldata-path" placeholder="username" type="text" maxlength="45">
    <button id="selldata-sell"></button>
    <p id="selldata-processing"></p>
    <div id="selldata-bar"></div>
</div>
`;

    document.getElementById("selldata-title").innerText = GetLocale("addr_selldata_title");

    let pathElem = document.getElementById("selldata-path");
    pathElem.placeholder = GetLocale("addr_selldata_path");

    let sellBtn = document.getElementById("selldata-sell");
    sellBtn.innerText = GetLocale("addr_selldata_sell");
    
    sellBtn.onclick = () => {
        sellBtn.disabled = true;
        let path = pathElem.value;

        fetch(`https://${GetParentResourceName()}/sellData`,
        {
            method: "POST",
            body: JSON.stringify({
                path: path
            })
        }).then(response => response.json()).then(data => {
            sellBtn.disabled = false;

            if (data.no)
                return MessageBox("error", "selldata.com", GetLocale("addr_selldata_bad"));

            if (data.ok)
                MessageBox("info", "selldata.com", GetLocale("addr_selldata_sold").replace("{1}", data.reward));
            else
                MessageBox("error", "selldata.com", GetLocale("addr_selldata_bad"));
        });
    };
});
