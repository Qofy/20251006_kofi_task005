export default class MathEx {
  static lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  static random(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }
  
  static radians(degrees) {
    return degrees * (Math.PI / 180);
  }
}