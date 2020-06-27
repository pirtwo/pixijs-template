import * as PIXI from "pixi.js";
import Sound from "pixi-sound";
import Stats from "stats.js";

const app = new PIXI.Application({
    backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

function init() {
    // load assets and fonts

    setup();
}

function setup() {
    let stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // game loop
    app.ticker.add((delta) => {
        stats.begin();

        // update game here

        stats.end();
    });
}