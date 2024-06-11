/* eslint-disable no-labels */
import {
  IStudentItem,
  ITeacherItem,
  ESubjectType,
  IStuSignUpCourseTotalItem,
  ICourseSchedulingItem,
  SUBJECT_TYPE_ZHCH_MAP,
} from "./types/teachingScheduling";

interface ITeachingScheduleInfos {
  schedulingDate: string[];
  teacherCoursesInfo: ITeacherItem[];
  studentSignUpInfo: IStudentItem[];
}

export default class TeachingSchedulingService {
  /** 学生报名数据 */
  private studentsSignUpInfoList: IStudentItem[] = [];
  /** 老师授课数据 */
  private teacherInfoList: ITeacherItem[] = [];
  /** 排班假期数据 */
  private schedulingDate: string[] = [];

  /** 课程报名数据 */
  private courseSignUpInfoMap: Map<ESubjectType, IStuSignUpCourseTotalItem[]> =
    new Map();

  /** 课程总次数 */
  private courseTotalTimes = 0;

  /** 输出：排课方案 */
  private courseSchedulingData: ICourseSchedulingItem[][] = [];

  constructor(scheduleInfos: ITeachingScheduleInfos) {
    this.teacherInfoList = scheduleInfos.teacherCoursesInfo;
    this.studentsSignUpInfoList = scheduleInfos.studentSignUpInfo;
    this.schedulingDate = scheduleInfos.schedulingDate;

    console.log("老师授课数据::> this.teacherInfoList", this.teacherInfoList);
    console.log(
      "学生报名数据::> this.studentsSignUpInfoList",
      this.studentsSignUpInfoList
    );
    console.log("排班假期数据::> this.schedulingDate", this.schedulingDate);
    console.log(
      "-----------------------------------------------------start-----------------------------------------------------"
    );

    this.initialCourseSignUpInfo();
    const schedulingData = this.permuteTeachingScheduling();
    console.log("第一节课schedulingData", schedulingData);
  }

  /**
   * 初始化 this.courseSignUpInfoMap
   */
  public initialCourseSignUpInfo() {
    this.studentsSignUpInfoList.forEach((stuItem) => {
      stuItem.courseInfo.forEach((courseInfoItem) => {
        if (!this.courseSignUpInfoMap.has(courseInfoItem.subName)) {
          this.courseSignUpInfoMap.set(courseInfoItem.subName, []);
        }

        const curSubSignUpInfoList = this.courseSignUpInfoMap.get(
          courseInfoItem.subName
        );
        // 把当前学生报名的当前课程信息push到courseSignUpInfoMap的对应课程的报名数组中
        curSubSignUpInfoList.push({
          stuOrder: stuItem.stuOrder,
          stuName: stuItem.stuName,
          ...courseInfoItem,
        });
      });
    });
    let curCourseTotalTimes = 0;
    // 遍历courseSignUpInfoMap，计算出课程总次数
    this.courseSignUpInfoMap.forEach(function (value) {
      curCourseTotalTimes += value.length;
    });
    this.courseTotalTimes = curCourseTotalTimes;

    console.log("课程报名数据（Map）::>", this.courseSignUpInfoMap);
    console.log("课程总次数 ::>", this.courseTotalTimes);
  }

  /**
   * 排课回溯算法
   */
  public permuteTeachingScheduling = () => {
    /** 排课总节数中顺序 */
    let courseNumOrder = 0;
    // 第几节课
    let curCourseScheduleOrder = 0;

    // 当前步属于第几阶段决策
    let decisionPhaseindex = 0;
    // 排课信息数组
    const courseSchedulingRes = [];
    // 排课记录
    const used = {};

    const dfs = (path, latestDecisionPhaseindex) => {
      // # --------------------------递归出口--------------------------
      // if (path.length === this.courseTotalTimes) {
      //   courseSchedulingRes.push(path.slice()); // 拷贝一份path，加入解集res
      //   return; // 结束当前递归分支
      // }

      // 最后一个老师选完一门课程及报名该课程的学生后，结束递归
      if (latestDecisionPhaseindex === this.teacherInfoList.length) {
        courseSchedulingRes.push(path.slice()); // 拷贝一份path，加入解集res
        return; // 结束当前递归分支
      }

      // for循环遍历老师
      outerFirst: for (let i = 0; i < this.teacherInfoList.length; i++) {
        const curTeacherInfoItem = this.teacherInfoList[i];
        const { ownerCourses } = curTeacherInfoItem;

        // 第几节课该老师 是否已经安排的标记key
        const courseTeacherKey = `${curCourseScheduleOrder}&${curTeacherInfoItem.tchName}`;

        // 如果第curCourseScheduleOrder节课该老师已经排课了，则 continue 跳过
        if (used[courseTeacherKey]) continue outerFirst;

        // for循环遍历该老师授课的数据
        for (const curTeacherCurCourseItem of ownerCourses) {
          // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度

          // 获取该老师的该课程被学生报名的数据
          const curTeacherCurCourseRegistrationList =
            this.courseSignUpInfoMap.get(curTeacherCurCourseItem);

          // for循环遍历该老师的该课程被学生报名的数据
          for (const courseRegistrationItem of curTeacherCurCourseRegistrationList) {
            // # --------------------------做选择--------------------------start

            /** 排课唯一标识：（暂时改成 `第几节课&授课老师&课程名称&学生`）`日期&上课时间段&授课老师&课程名称&学生` */
            const courseSchedulingKey = `${courseTeacherKey}&${SUBJECT_TYPE_ZHCH_MAP.get(
              curTeacherCurCourseItem
            )}&${courseRegistrationItem.stuName}&${
              courseRegistrationItem.stuOrder
            }`;

            // 若排课唯一标识被用过 或者 该学生的该课程已经被排了，则 continue 跳过
            const isUsed =
              used[courseSchedulingKey] || courseRegistrationItem.arranged;
            if (isUsed) continue;

            // 选择当前的数，加入path
            path.push({
              /** 排课总节数中顺序 */
              courseNumOrder: 0,
              /** 第几节课 */
              courseIndex: curCourseScheduleOrder,
              /** 排课唯一标识 */
              courseSchedulingKey,
              /** 上课老师 */
              courseTeacher: curTeacherInfoItem.tchName,
              /** 课程 */
              course: courseRegistrationItem,
              /** 上课学生 */
              courseStudent: courseRegistrationItem.stuName,
            });

            // 标记：第curCourseScheduleOrder节课当前老师已经排课了
            used[courseTeacherKey] = true;

            // 标记：该学生该报名课程已经排课了
            courseRegistrationItem.arranged = true;

            // 标记：记录一下排课唯一标识
            used[courseSchedulingKey] = true;

            courseNumOrder += 1;
            // curCourseScheduleOrder += 1;

            // # --------------------------做选择--------------------------end

            // # --------------------------递归进行下一次选择（进入下一层决策树）（递归，纵向遍历）--------------------------

            // 基于选了当前的数，递归
            dfs(path, latestDecisionPhaseindex + 1);

            // # --------------------------撤销选择--------------------------start

            // 上一句的递归结束，回溯，将最后选的数pop出来
            path.pop();

            // 撤销标记：该老师在第curCourseScheduleOrder节课还没有排课
            used[courseTeacherKey] = false;

            // 撤销标记：该学生该报名课程还没有排课
            courseRegistrationItem.arranged = false;

            // 撤销标记：取消记录排课唯一标识
            used[courseSchedulingKey] = false;

            courseNumOrder -= 1;

            // # --------------------------撤销选择--------------------------end
          }
        }
      }
    };

    dfs([], decisionPhaseindex); // 递归的入口，空path传进去
    return courseSchedulingRes;
  };
}
