export default class Keyboard {
    constructor(code) {
        this.code = code;
        this.isKeyup = true;
        this.isKeydown = false;
        this.onKeyup = undefined;
        this.onKeydown = undefined;

        this.keyupHandler = (e) => {
            if (e.keyCode == this.code) {
                if (this.isKeydown && this.onKeyup) this.onKeyup(e);
                this.isKeyup = true;
                this.isKeydown = false;
            }
        }

        this.keydownHandler = (e) => {
            if (e.keyCode == this.code) {
                if (this.isKeyup && this.onKeydown) this.onKeydown(e);
                this.isKeyup = false;
                this.isKeydown = true;
            }
        }

        document.addEventListener("keyup", this.keyupHandler);
        document.addEventListener('keydown', this.keydownHandler);
    }

    destroy() {
        document.removeEventListener('keyup', this.keyupHandler);
        document.removeEventListener('keydown', this.keydownHandler);
    }
}