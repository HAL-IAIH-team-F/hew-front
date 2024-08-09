export namespace Random {
  export function randomLessThen(num: number) {
    return Math.floor(Math.random() * num);
  }

  export function randomInt(max: number) {
    return randomLessThen(max + 1);
  }

  export function randomItem<T>(array: T[]): T {
    return array[randomLessThen(array.length)];
  }
}