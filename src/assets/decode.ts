const allAvailableCharacters = "0123456789abcdefghijklmnopqrstuvwxyz";

interface decodeTextInterface{
    text : String;
    radix : number;
}

interface decodeTextReturnValuesInterface{
    status : boolean;
    text : string;
}

function decodeText(theArguments : decodeTextInterface){
    let enabledCharacters : string = allAvailableCharacters.substring(0, theArguments.radix);
    let textSize : number = theArguments.text.length;
    let isValid : Boolean = true;
    let finalValue : string = "";
    let splittedValues : string[] = null;
    let i = 0;


    while(isValid == true && i < textSize){
        if(enabledCharacters.indexOf(theArguments.text[i]) == -1 && theArguments.text[i] != ' '){
            isValid = false;
        }

        i++;
    }
    
    if(isValid == true){
        splittedValues = theArguments.text.split(" ");

        for(const value of splittedValues){
            if(value.length > 0){
                finalValue += String.fromCharCode(parseInt(value, theArguments.radix));
            }
        }

        return {status: true, text: finalValue};
    }
    else{
        return {status: false, text: null};
    }
}

export{
    decodeText,
    decodeTextReturnValuesInterface
}