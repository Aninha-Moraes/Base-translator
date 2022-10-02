class BubbleAnimation{
    #__canvas = null;
    #__canvasPointer = null;
    #__colorsPointer = null;
    #__bubblesArray = [];
    #__maxBubbleSize = null;
    #__bubbleGrowingStep = null;
    #__bubbleCreationRate = null;
    #__userIsOnline = true;
    #__bubblesBackground = null;

    constructor(canvas, colors, maxBubbleSize, bubbleGrowingStep, bubbleCreationRate, backgroundColor){
        this.#__canvasPointer = canvas.getContext("2d");
        this.#__colorsPointer = colors;
        this.#__maxBubbleSize = maxBubbleSize;
        this.#__bubbleGrowingStep = bubbleGrowingStep;  
        this.#__bubbleCreationRate = bubbleCreationRate;
        this.#__bubblesBackground = backgroundColor
        this.#__canvas = canvas;

        this.bubbleAnimation = this.bubbleAnimation.bind(this);

        document.addEventListener("visibilitychange", () => {
            switch(this.#__userIsOnline){
                case true:
                    this.#__userIsOnline = false;
                    break;
                case false:
                    this.#__userIsOnline = true;
                    break;
            }
        });


        setInterval(() => {
            if(this.#__userIsOnline == true){
                this.#__bubblesArray.push({
                    "growing" : true,
                    "color" : this.#__colorsPointer[Math.trunc(Math.random() * this.#__colorsPointer.length)],
                    "currentSize" : 0,
                    "x" : Math.trunc(Math.random() * canvas.width),
                    "y" : Math.trunc(Math.random() * canvas.height)
                })
            }
        }, this.#__bubbleCreationRate);

        window.requestAnimationFrame(this.bubbleAnimation);
    }

    bubbleAnimation(){
        let canvasComputedStyle = window.getComputedStyle(this.#__canvas);
        let theWidth = canvasComputedStyle.width;
        let theHeight = canvasComputedStyle.height;

        this.#__canvas.width = Number(theWidth.substring(0, theWidth.length - 2));
        this.#__canvas.height = Number(theHeight.substring(0, theHeight.length - 2));

        this.#__canvasPointer.beginPath();
        this.#__canvasPointer.fillStyle = this.#__bubblesBackground;
        this.#__canvasPointer.rect(0,0,this.#__canvas.width, this.#__canvas.height);
        this.#__canvasPointer.fill();
        this.#__canvasPointer.closePath();

        for(let i = 0; i < this.#__bubblesArray.length; i++){
            switch(this.#__bubblesArray[i].growing){
                case true:
                    if(this.#__bubblesArray[i].currentSize >= this.#__maxBubbleSize){
                        this.#__bubblesArray[i].growing = false;
                    }
                    else{
                        this.#__bubblesArray[i].currentSize += this.#__bubbleGrowingStep;
                    }
                    break;
                case false:
                    if(this.#__bubblesArray[i].currentSize <= 0 || this.#__bubblesArray[i].currentSize - this.#__bubbleGrowingStep <= 0){
                        this.#__bubblesArray.splice(i,1);
                    }
                    else{
                        this.#__bubblesArray[i].currentSize -= this.#__bubbleGrowingStep;
                    }
                    break;
            }
        }

        for(const bubble of this.#__bubblesArray){
            this.#__canvasPointer.beginPath();
            this.#__canvasPointer.fillStyle = bubble.color;
            this.#__canvasPointer.arc(bubble.x, bubble.y, bubble.currentSize, 0, 2 * Math.PI, false);
            this.#__canvasPointer.fill();
            this.#__canvasPointer.closePath();
        }

        window.requestAnimationFrame(this.bubbleAnimation);
    }
}