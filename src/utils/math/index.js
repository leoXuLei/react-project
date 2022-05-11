/**
 *
 *
 * @export 获取整数随机数
 * @param {*} min
 * @param {*} max
 * @return {*} number
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
