

interface encodeTextInterface{
    text : String;
    radix : number;
}

function encodeText(theArguments : encodeTextInterface){
    let stringSize : number = theArguments.text.length;
    let finalEncodedText : string = "";

    for(let i = 0; i < stringSize; i++){
        finalEncodedText += theArguments.text.charCodeAt(i).toString(theArguments.radix) + " ";
    }

    return finalEncodedText;
}

export{
    encodeText
}