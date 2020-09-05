/**
 * returns cancelable promise.
 * @param {Number} duration 
 */
export function wait(duration = 0) {
    return makeCancelable(new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    }));
}

/**
 * shuffles the array with Fisher–Yates algorithm.
 * @param {Array} array 
 */
export function shuffle(array) {
    let shuffledArray = array.slice(0);

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

/**
 * returns random element from array.
 * @param {Array} arr 
 */
export function getRandomElement(arr = []) {
    return arr[randInt(0, arr.length - 1)];
}

/**
 * loads provided font familes from google web fonts.
 * @param {Array} families 
 * @param {Function} loadCallback 
 */
export function loadWebfonts(families = ['Snippet'], loadCallback = undefined) {
    window.WebFontConfig = {
        google: {
            families: families,
        },

        active() {
            if (loadCallback) loadCallback();
        }
    };

    const webFontScript = document.createElement('script');
    webFontScript.src = `${document.location.protocol === 'https:' ? 'https' : 'http'}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    webFontScript.type = 'text/javascript';
    webFontScript.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(webFontScript, s);
}

/**
 * scales canvas based on width and height of the window.
 * https://github.com/kittykatattack/scaleToWindow
 * @param {*} canvas 
 * @param {*} backgroundColor 
 */
export function scaleToWindow(canvas, backgroundColor) {
    var scaleX, scaleY, scale, center;

    //1. Scale the canvas to the correct size
    //Figure out the scale amount on each axis
    scaleX = window.innerWidth / canvas.offsetWidth;
    scaleY = window.innerHeight / canvas.offsetHeight;

    //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
    scale = Math.min(scaleX, scaleY);
    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = "scale(" + scale + ")";

    //2. Center the canvas.
    //Decide whether to center the canvas vertically or horizontally.
    //Wide canvases should be centered vertically, and 
    //square or tall canvases should be centered horizontally
    if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) {
            center = "horizontally";
        } else {
            center = "vertically";
        }
    } else {
        if (canvas.offsetHeight * scale < window.innerHeight) {
            center = "vertically";
        } else {
            center = "horizontally";
        }
    }

    //Center horizontally (for square or tall canvases)
    var margin;
    if (center === "horizontally") {
        margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
        canvas.style.marginTop = 0 + "px";
        canvas.style.marginBottom = 0 + "px";
        canvas.style.marginLeft = margin + "px";
        canvas.style.marginRight = margin + "px";
    }

    //Center vertically (for wide canvases) 
    if (center === "vertically") {
        margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
        canvas.style.marginTop = margin + "px";
        canvas.style.marginBottom = margin + "px";
        canvas.style.marginLeft = 0 + "px";
        canvas.style.marginRight = 0 + "px";
    }

    //3. Remove any padding from the canvas  and body and set the canvas
    //display style to "block"
    canvas.style.paddingLeft = 0 + "px";
    canvas.style.paddingRight = 0 + "px";
    canvas.style.paddingTop = 0 + "px";
    canvas.style.paddingBottom = 0 + "px";
    canvas.style.display = "block";

    //4. Set the color of the HTML body background
    document.body.style.backgroundColor = backgroundColor;

    //Fix some quirkiness in scaling for Safari
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
            // Chrome
        } else {
            // Safari
            //canvas.style.maxHeight = "100%";
            //canvas.style.minHeight = "100%";
        }
    }

    //5. Return the `scale` value. This is important, because you'll nee this value 
    //for correct hit testing between the pointer and sprites
    return scale;
}

/**
 * returns random integer number between min and max, both parameters are
 * inclusive.
 * 
 * @param {number} min 
 * @param {number} max 
 */
export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * returns random float number between min and max, both parameters are
 * inclusive.
 * 
 * @param {number} min 
 * @param {number} max 
 */
export function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function makeCancelable(promise) {
    let canceled = false;
    const wrapperPromise = new Promise((resolve, reject) => {
        promise.then(val => {
            canceled ? reject({
                canceled: true
            }) : resolve(val);
        }).catch(error => {
            canceled ? reject({
                canceled: true
            }) : reject(error)
        });
    });

    return {
        promise: wrapperPromise,
        cancel: () => {
            canceled = true;
        }
    }
}