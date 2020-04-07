import * as PIXI from "pixi.js";

const app = new PIXI.Application({
    backgroundColor: 0x1099bb
});
const Sprite = PIXI.Sprite;
const Container = PIXI.Container;
const stage = app.view;
const screen = app.screen;
const resources = app.loader.resources;

document.body.appendChild(app.view);

app.loader
    .add("chicken", "assets/sprites/chicken.png")
    .load(setup);

function setup() {
    const texture = resources.chicken.texture;
    const chickenCnt = new Container();

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let chicken = new Sprite(texture);
            chicken.setTransform(1, 1, 0.03, 0.03);
            chicken.anchor.set(0.5, 0.5);
            chicken.x = i * 50;
            chicken.y = j * 50;
            chickenCnt.addChild(chicken);
        }
    }

    chickenCnt.pivot.set(chickenCnt.width / 2, chickenCnt.height / 2);
    chickenCnt.position.set(app.screen.width / 2, app.screen.height / 2);

    app.stage.addChild(chickenCnt);
    
    app.ticker.add(() => {
        chickenCnt.rotation += 0.001;

        chickenCnt.children.forEach(c => {
            c.rotation += 0.01;
        })
    });
}