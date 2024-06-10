import { starterEditionTestDataOne } from "./2024 清明三天假期排班需求";
import { SUBJECT_TYPE_ZHCH_MAP } from "./teachingSchedulingSystem/types/teachingScheduling";

export const stuCourseInfos =
  starterEditionTestDataOne.studentSignUpInfo.reduce((total, item) => {
    const { stuName, courseInfo } = item;
    courseInfo.forEach((courseItem) => {
      total.push({
        stuName,
        subName: SUBJECT_TYPE_ZHCH_MAP.get(courseItem.subName),
      });
    });
    return total;
  }, []);

// -------------------------------------------------------One----------------------
/**
 * 学生老师排课-全排列算法（使用【入门版测试数据一】，先测试下只看学生报名信息排课方案）
 * @param {Array{ stuName: string, subName: string}} nums
 * @return {number[][]}
 */

export const permuteTeachingSchedulingSystemOne = (
  nums: { stuName: string; subName: string }[]
) => {
  const res = [];
  const used = {};

  function dfs(path) {
    // 个数选够了
    if (path.length === nums.length) {
      res.push(path.slice()); // 拷贝一份path，加入解集res
      return; // 结束当前递归分支
    }
    // for枚举出每个可选的选项
    for (const num of nums) {
      // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度
      const key = `${num.stuName}-${num.subName}`;
      if (used[key]) continue; // 使用过的，跳过
      path.push(key); // 选择当前的数，加入path
      used[key] = true; // 记录一下 使用了
      dfs(path); // 基于选了当前的数，递归
      path.pop(); // 上一句的递归结束，回溯，将最后选的数pop出来
      used[key] = false; // 撤销这个记录
    }
  }

  dfs([]); // 递归的入口，空path传进去
  return res;
};

export const testRes1 = permuteTeachingSchedulingSystemOne(stuCourseInfos);

// -------------------------------------------------------Two----------------------

/**
 * 学生老师排课-全排列算法（使用【入门版测试数据一】，按照思路：某个时间段——遍历老师——该老师教授的课程中选一门——报名该课程的学生选一个，来尝试写）
 * @param {Array{ stuName: string, subName: string}} nums
 * @return {number[][]}
 */

export const permuteTeachingSchedulingSystemTwo = (
  nums: { stuName: string; subName: string }[]
) => {
  const res = [];
  const used = {};

  function dfs(path) {
    // 个数选够了
    if (path.length === nums.length) {
      res.push(path.slice()); // 拷贝一份path，加入解集res
      return; // 结束当前递归分支
    }
    // for枚举出每个可选的选项
    for (const num of nums) {
      // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度
      const key = `${num.stuName}-${num.subName}`;
      if (used[key]) continue; // 使用过的，跳过
      path.push(key); // 选择当前的数，加入path
      used[key] = true; // 记录一下 使用了
      dfs(path); // 基于选了当前的数，递归
      path.pop(); // 上一句的递归结束，回溯，将最后选的数pop出来
      used[key] = false; // 撤销这个记录
    }
  }

  dfs([]); // 递归的入口，空path传进去
  return res;
};
