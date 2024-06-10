/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {string[]}
 */
function maxNumberOfFamilies(n, reservedSeats) {
  const planrRes = [];
  // 每个版块的结尾下标是 2、6、9
  const columnSplitEndIndexArr = [2, 6, 9];
  // 每个版块的数量对应是 [3,4,3]
  const columnSplitNums = columnSplitEndIndexArr.map((item, index, array) => {
    if (index === 0) {
      return item + 1;
    }
    return item - array[index - 1];
  });
  console.log("columnSplitNums", columnSplitNums);
  // 找到能容纳4人的版块下标
  const findEnoughSplitIndexs = columnSplitNums.reduce((total, item, index) => {
    if (item >= 4) {
      total.push(index);
    }
    return total;
  }, []);

  console.log("findEnoughSplitIndexs", findEnoughSplitIndexs);

  const positionArr = [];
  for (let i = 1; i <= n; i++) {
    positionArr[i - 1] = [];
  }

  reservedSeats.forEach((item) => {
    const rowIndex = item[0] - 1;
    const columnIndex = item[1] - 1;
    positionArr[rowIndex][columnIndex] = 1;
  });

  console.log("first", JSON.parse(JSON.stringify(positionArr)));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 7; j++) {
      // 从当前列开始，数四列，如果有位置被占了，则break从下一列再开始继续开始数4列（可优化点：下一次从被占的列的下一列开始数）
      for (let k = j; k < j + 4; k++) {
        if (positionArr[i][k]) {
          break;
        }
        // 4 人只能坐同一个版块，或者 坐相邻版块，一边坐两个人。
        //   第一种：4 人坐同一个版块。即 4 人位置都在两个连续的结尾下标中间。即 4 人位置第一位在某上一个版块结尾下标后面，4 人位置第4位在某下一个版块结尾下标前面。
        const isSitOnTheSameSplit = findEnoughSplitIndexs.some((indexItem) => {
          if (indexItem > 0) {
            return (
              j > columnSplitEndIndexArr[indexItem - 1] &&
              j + 3 <= columnSplitEndIndexArr[indexItem]
            );
          }
          return j + 3 <= columnSplitEndIndexArr[indexItem];
        });

        //   第二种：坐相邻版块，一边坐两个人。即 4 人中左边第二个人位置放在某个版块结尾下标处。左边第二个人位置即j+1;
        const isSitNextToEachOther = columnSplitEndIndexArr.includes(j + 1);
        if (!(isSitOnTheSameSplit || isSitNextToEachOther)) {
          break;
        }

        // 如果从当前列开始，数四列后发现都没有被占，则这四个位置是可用的。
        if (k === j + 3) {
          // 输出 1 个 4 人家庭有多少种座位方案 还是 最多能安排多少个 4 人家庭。在这里处理即可，根据需要放开/不放开注释：若已经设置好位置，则更新到positionArr
          positionArr[i][j] = 1;
          positionArr[i][j + 1] = 1;
          positionArr[i][j + 2] = 1;
          positionArr[i][j + 3] = 1;

          planrRes.push(
            // 以下行号都是表示从1-10，而不是下标0-9
            `行号：${i + 1}, 列号：${j + 1}、${j + 2}、${j + 3}、${j + 4}`
          );
        }
      }
    }
  }

  // 同样条件，1 个 4 人家庭有多少种座位方案。即planrRes数组的元素数量

  // 最多能安排多少个 4 人家庭？即planrRes数组中的方案不能有位置的重复了

  console.log("first", JSON.parse(JSON.stringify(positionArr)));

  console.log(planrRes);
  return planrRes;
}

export default maxNumberOfFamilies;
