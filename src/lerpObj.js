import Maths from './maths';
export default class LerpObj {
    constructor(startVal) {
        this.current = startVal ? startVal : 0;
        this.target = startVal ? startVal : 0;
        this._target = startVal ? startVal : 0;
    }
    
    update(speed) {
        this.current = Maths.lerp(this.current, this.target, speed ? speed : 0.01);
    }

    wiggle(factor) {
    	if (this.current > this.target - 0.01 && this.current < this.target + 0.01) {
    		this.target = Maths.random(this._target - 1*factor*0.5, this._target + 1*factor*0.5);
    	}
    }
}
