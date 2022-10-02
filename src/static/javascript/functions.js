function generateBaseOptions(){
    let baseOptionElement = null;
    let baseOptionLabel = null;

    for(let i = 2; i <= 36; i++){
        baseOptionElement = document.createElement("div");
        baseOptionElement.classList.add("base_option");
        baseOptionElement.style.cursor = "pointer";

        baseOptionElement.addEventListener("click", () => {
            currentSelectedBase = i;
            baseDisplay.innerText = `Base ${currentSelectedBase}`;
        });
        
        baseOptionLabel = document.createElement("p");
        baseOptionLabel.innerText = `Base ${i}`;

        if(i % 2 == 0){
            baseOptionElement.style.background = baseOptionColor2;
            baseOptionElement.style.color = "#F2F4F3";
        }
        else{
            baseOptionElement.style.background = baseOptionColor1;
        }
        
        baseOptionElement.appendChild(baseOptionLabel);

        optionsBirthPlace.appendChild(baseOptionElement);
    }   
}

function showDynamicMessages(displayMessage, whichOne){
    let messageToShow = whichOne == 1 ? warningDisplay : copyMessageDisplay;
    let messageToShowText = whichOne == 1 ? warningDisplayText : copyMessageDisplayText;

    messageToShow.style.transition = "1s";
    messageToShow.style.opacity = "1";
    messageToShowText.innerText = displayMessage;

    setTimeout(() => {
        messageToShow.style.opacity = "0";
    }, 2500);
}

function generateServerRequest(targetPath, requestMethod, text, base){
    return new Request(targetPath,{
        method: requestMethod,
        body: JSON.stringify({"text" : text, "base" : base}),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

async function encodeText(){
    let serverPromise = new Promise((solve) => {
        let serverRequest = generateServerRequest(encodeServerRoute, "POST", entryPoint.value, currentSelectedBase);

        fetch(serverRequest).then((value) => {
            value.text().then((theValue) => {
                outputPoint.value = theValue;
            })
        }).catch((reason) => {  

        });
    });
}

async function decodeText(){
    let serverRequest = generateServerRequest(decodeServerRoute, "POST", entryPoint.value, currentSelectedBase);

    try{
        let fetchResult = await fetch(serverRequest);
        let responseStatus = fetchResult.status;
        let resultAsText = await fetchResult.text();

        if(responseStatus == 200){
            outputPoint.value = resultAsText;
        }
        else{
            showDynamicMessages(`Warning: unknow char in base ${currentSelectedBase}`, 1);
        }
    }
    catch(reason){
        window.alert("Error: " + reason);
    }
}

function copyOutputText(){
    navigator.clipboard.writeText(outputPoint.value).then(() => {
        showDynamicMessages(copyMessageSuccessful, 2);
    });
}

function showBases(){
//    optionsBirthPlace.style.transition = "1s";
    optionsBirthPlace.style.visibility = "visible";
}

function hideBases(){
    let computedStyles = window.getComputedStyle(siteBase);

    if(Number(computedStyles.width.substring(0,computedStyles.width.length - 2)) <= 696){
        optionsBirthPlace.style.visibility = "hidden";
    }
}