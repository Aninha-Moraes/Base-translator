import express, {Express, Request, Response} from "express";
import {join, resolve} from "path";
import {json} from "body-parser";
import {encodeText} from "./assets/encode";
import {decodeText, decodeTextReturnValuesInterface} from "./assets/decode";

const PORT = 8080;
const app : Express = express();
app.use(express.static(join(__dirname, "static")));
app.use(json());

app.get("/", (req : Request, res : Response) => {
    res.sendFile(resolve(__dirname, "static", "html", "index.html"));
})

app.post("/encodeText", (req : Request, res : Response) => {
    let textToEncode = req.body.text;
    let encodeRadix = req.body.base;

    let resultText = encodeText({text: textToEncode, radix: encodeRadix});

    res.send(resultText);
});

app.post("/decodeText", (req : Request, res : Response) => {
    let textToDecode = req.body.text;
    let decodeRadix = req.body.base;

    let decodeResult : decodeTextReturnValuesInterface = decodeText({text: textToDecode, radix: decodeRadix});

    if(decodeResult.status == true){
        res.status(200);
        res.send(decodeResult.text);
    }
    else{
        res.status(400);
        res.send(" ");
    }
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})