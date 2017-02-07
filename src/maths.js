export default class Maths {

    static clamp(value, min, max) {

        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }

        return value;
    }

    static map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    }

    static lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }
    static random(min, max) {
         return Math.floor(Math.random()*(max-min+1)+min);
    }

    static randomFloor(min, max) {
        return Math.random() * (max - min) + min;
    }
}
