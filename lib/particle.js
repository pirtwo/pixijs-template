/**
 * Particle system for pixijs
 */
export default class Particle {
    constructor() {
        this.batches = [];
    }

    /**
     * creates a new batch of particles with given options.
     * 
     * @param {Object} arg
     * @param {Number} arg.x particles emmit position X
     * @param {Number} arg.y particles emmit position Y
     * @param {Number} arg.number number of particles
     * @param {Function} arg.sprite function for supplying sprites for each particle
     * @param {PIXI.Container} arg.container particles container
     * @param {Number} arg.gravity apply gravity for each particle
     * @param {Number} arg.minSpeed particle min speed
     * @param {Number} arg.maxSpeed particle max speed
     * @param {Number} arg.minAngle particle min emmit angle
     * @param {Number} arg.maxAngle particle max emmit angle
     * @param {Number} arg.minScale particle init scale
     * @param {Number} arg.maxScale particle init scale
     * @param {Number} arg.minFadeSpeed particle min fade speed
     * @param {Number} arg.maxFadeSpeed particle max fade speed
     * @param {Number} arg.minScaleSpeed particle min scale speed (set to 1 for no scale)
     * @param {Number} arg.maxScaleSpeed particle max scale speed (set to 1 for no scale)
     * @param {Number} arg.minRotation particle min rotation speed
     * @param {Number} arg.maxRotation particle max rotation speed
     * @returns {Array}
     */
    create({
        x = 0,
        y = 0,
        number,
        sprite,
        container,
        gravity = 0.1,
        minSpeed = 1,
        maxSpeed = 5,
        minAngle = 0,
        maxAngle = 360,
        minFadeSpeed = 0.02,
        maxFadeSpeed = 0.05,
        minScaleSpeed = 1,
        maxScaleSpeed = 1,
        minRotation = -10,
        maxRotation = 10
    }) {
        let batch = [];
        for (let i = 0; i < number; i++) {
            let particle = sprite();
            particle.gravity = gravity;
            particle.particleSpeed =
               randFloat(minSpeed, maxSpeed);
            particle.particleRotation =
               randFloat(minRotation, maxRotation);
            particle.particleFade =
               randFloat(minFadeSpeed, maxFadeSpeed);
            particle.particleAngle =
               randFloat(minAngle, maxAngle) * Math.PI / 180;
            particle.particleScaleSpeed =
               randFloat(minScaleSpeed, maxScaleSpeed);
            particle.vx = particle.particleSpeed * Math.cos(particle.particleAngle);
            particle.vy = particle.particleSpeed * Math.sin(particle.particleAngle);
            particle.position.set(x, y);
            container.addChild(particle);
            batch.push(particle);
        }
        this.batches.push(batch);

        return batch;
    }

    /**
     * creates a new particle emmiter with given options.
     * 
     * @param {Object} config 
     * @param {Number} period
     * @returns {ParticleEmitter} 
     */
    emitter(config, period) {
        return new ParticleEmitter(this, config, period);
    }

    update(delta = 1) {
        for (let i = this.batches.length - 1; i >= 0; i--) {
            const batch = this.batches[i];
            for (let j = batch.length - 1; j >= 0; j--) {
                const particle = batch[j];
                particle.vy += particle.gravity;
                particle.x += particle.vx * delta;
                particle.y += particle.vy * delta;
                particle.angle += particle.particleRotation;
                particle.alpha -= particle.particleFade;
                particle.width *= particle.particleScaleSpeed;
                particle.height *= particle.particleScaleSpeed;
                if (particle.alpha <= 0) {
                    particle.parent.removeChild(particle);
                    particle.destroy();
                    batch.splice(j, 1);
                }
            }
            if (batch.length === 0) this.batches.splice(i, 1);
        }
    }
}

/**
 * emmiter class for PrticleJS
 */
class ParticleEmitter {
    constructor(particle, config, period) {
        this.timer = undefined;
        this.particle = particle;
        this.config = config;
        this.period = period;
    }

    /**
     * start emmiting.
     */
    start() {
        this.timer = setInterval(() => this.particle.create(this.config), this.period);
        return this.timer;
    }

    /**
     * stop emmiting.
     */
    stop() {
        clearInterval(this.timer);
    }
}

/**
 * Returns random float number between min and max, both parameters are
 * inclusive.
 * 
 * @param {number} min 
 * @param {number} max 
 */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}