/**
 * Returns random integer number between min and max, both parameters are
 * inclusive.
 * 
 * @param {number} min 
 * @param {number} max 
 */
export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns random float number between min and max, both parameters are
 * inclusive.
 * 
 * @param {number} min 
 * @param {number} max 
 */
export function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}