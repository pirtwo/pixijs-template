import * as PIXI from "pixi.js";
import Sound from "pixi-sound";

const app = new PIXI.Application({
    backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

function setup() {
    // game setup   
}

function update(delta) {
    // game loop
}

app.ticker.add((delta) => {
    update(delta);
});