let optionsBirthPlace = document.getElementsByTagName("aside")[0];
let basesBox = document.getElementById("basesBox");
let siteBase = document.getElementById("site_base");
let entryPoint = document.getElementById("entry_point");
let canvas = document.getElementById("animationTarget");
let outputPoint = document.getElementById("output_point");
let baseDisplay = document.getElementById("base_display");
let warningDisplay = document.getElementById("warning_place");
let warningDisplayText = document.getElementById("warning_message");
let copyMessageDisplay = document.getElementById("copy_message_place");
let copyMessageDisplayText = document.getElementById("copy_message_text");

let currentSelectedBase = 2;

const baseOptionColor1 = "#1C7293";
const baseOptionColor2 = "#071013";
const encodeServerRoute = "/encodeText";
const decodeServerRoute = "/decodeText";
const copyMessageSuccessful = "Text copied to clipboard";

new BubbleAnimation(canvas, ["#47a025", "#ffffff", "#9000b3", "#007ea7"], 20, 0.2, 400, "#071013");

generateBaseOptions();




