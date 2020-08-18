import * as PIXI from "pixi.js";
import Sound from "pixi-sound";
import Stats from "stats.js";

const app = new PIXI.Application({
    backgroundColor: 0x1099bb
});

function init() {
    // load assets and fonts
    document.body.appendChild(app.view);
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

init();