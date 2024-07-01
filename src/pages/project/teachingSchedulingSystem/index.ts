/* eslint-disable no-labels */
import { produce } from "immer";
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

  /** 课程报名信息 */
  private courseSignUpInfoMap: Map<ESubjectType, IStuSignUpCourseTotalItem[]> =
    new Map();

  /** 课程报名总节数 */
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

    console.log("课程报名信息（Map）::>", this.courseSignUpInfoMap);
    console.log("课程报名总节数 ::>", this.courseTotalTimes);
  }

  /**
   * 排课回溯算法
   */
  public permuteTeachingScheduling = () => {
    /** 排课总节数中顺序 */
    let courseNumOrder = 0;
    // 第几节课
    const courseIndex = 0;

    // 当前步属于第几阶段决策
    const decisionPhaseindex = 0;

    // 排课信息选择（老师、学生、排课惟一标识）记录
    const usedSchedulingInfoObj = {};
    // 方案是否重复记录（某些方案同一节课时只是顺序不同实则方案重复）
    const repeatedSchedulingInfoObj = {};

    // 输出：排课方案
    // const courseSchedulingRes: ICourseSchedulingItem[][] = [];
    const courseSchedulingRes: any[] = [];

    // 临时：排前两节课
    const targetTotalCourseNumber = 4;

    // 递归开始时间点
    console.time("myFunction");
    const startTime = new Date().getTime();

    /**
     * 排课递归
     * @param path 当前排课方案
     * @param curCourseIndex 当前是第几节课，即当前是第几步
     * @param curDecisionPhaseindex 当前步属于第几阶段决策
     */
    const dfs = (
      path: ICourseSchedulingItem[],
      curCourseIndex: number,
      curDecisionPhaseindex: number
    ) => {
      // # ------------------------------------------（一）递归出口------------------------------------------
      // 排第curCourseIndex节课时，若 最后一个老师选完一门课程及报名该课程的一个学生后 或者 当前排课方案长度等于课程报名总节数，则结束递归
      if (
        curDecisionPhaseindex === this.teacherInfoList.length ||
        path.length === this.courseTotalTimes
      ) {
        // 使用 immer 进行深拷贝（并重新映射每个元素的属性），拷贝一份当前排课方案，加入解集res
        const deepCopiedPath = produce(path.slice(), (draft) => {
          // 当前排课方案按照courseSchedulingKey属性排序
          return draft.sort((a, b) =>
            a?.courseSchedulingKey?.localeCompare(b?.courseSchedulingKey, "zh")
          );
        }).map((item) => ({ ...item }));

        // 当前排课方案所有排课的惟一标识组成当前方案标记
        const curSchedulingUniqueMarkers = deepCopiedPath.reduce(
          (total, item) => (total += `${item.courseSchedulingKey}_`),
          ""
        );
        // 若第curCourseIndex节课的方案标记重复，不进入解集数组中。否则进入。
        if (repeatedSchedulingInfoObj[curSchedulingUniqueMarkers]) {
          return;
        }

        // 当前（最新）方案标记记录一下，这行代码放在这里跟放在`courseSchedulingRes.push(deepCopiedPath);`上一行相比较：执行快很多，同时repeatedSchedulingInfoObj对象存储的属性也更多。
        repeatedSchedulingInfoObj[curSchedulingUniqueMarkers] = true;

        // # ------------------------------------------（三）递归进行下一次选择（进入下一层决策树）（递归，纵向遍历）------------------------------------------
        // 若当前排课方案长度没有达到课程报名总节数，但又进入了if说明此时第curCourseIndex节课排完了，则继续排下一节课。否则输出方案
        if (deepCopiedPath.length < this.courseTotalTimes) {
          // 基于选了的当前方案item，递归（纵向遍历），从下一节课第一阶段开始排
          return dfs(deepCopiedPath, curCourseIndex + 1, 0);
        }

        courseSchedulingRes.push(deepCopiedPath);
        // 结束当前递归分支
        return;
      }

      // for循环遍历老师（横向遍历）
      firstForeachTch: for (let i = 0; i < this.teacherInfoList.length; i++) {
        const curTeacherInfoItem = this.teacherInfoList[i];
        const { ownerCourses } = curTeacherInfoItem;

        // 标记1-key：第几节课该老师 是否已经安排的标记key
        const courseIndexTchArrangedKey = `${curCourseIndex}&${curTeacherInfoItem.tchOrder}`;

        // 如果第courseIndex节课该老师已经排课了，则 continue 跳过
        if (usedSchedulingInfoObj[courseIndexTchArrangedKey]) {
          continue firstForeachTch;
        }

        // for循环遍历该老师授课的数据
        for (const curTeacherCurCourseItem of ownerCourses) {
          // 获取（该老师的）该课程被学生报名的数据
          const curCourseSignUpInfos = this.courseSignUpInfoMap.get(
            curTeacherCurCourseItem
          );

          // for循环遍历（该老师的）该课程被学生报名的数据
          for (const courseRegistrationItem of curCourseSignUpInfos) {
            // # ------------------------------------------（二）做选择------------------------------------------start
            // 若该学生的该课程已经被排了，则 continue 跳过
            if (courseRegistrationItem.arranged) continue;

            // 若该学生上节课已经排课了，则这节课不安排该学生的课，continue 跳过（【学生上课要求一：课程不可以连着】）
            const lastCourseIndexStuArrangedKey = `${curCourseIndex - 1}&${
              courseRegistrationItem.stuName
            }`;
            if (
              curCourseIndex > 0 &&
              usedSchedulingInfoObj[lastCourseIndexStuArrangedKey]
            ) {
              continue;
            }

            // 标记2-key：第几节课该学生 是否已经安排的标记key
            const courseIndexStuArrangedKey = `${curCourseIndex}&${courseRegistrationItem.stuName}`;

            // 该课程中文名
            const courseZhName = SUBJECT_TYPE_ZHCH_MAP.get(
              curTeacherCurCourseItem
            );

            // 标记3-key：
            /** 排课唯一标识：（暂时改成 `第几节课&授课老师&课程名称&学生`）`日期&上课时间段&授课老师&课程名称&学生` */
            const courseSchedulingKey = `${courseIndexTchArrangedKey}&${courseZhName}&${courseRegistrationItem.stuOrder}`;

            // 若排课唯一标识被用过 或者 第几节课该学生已经有排课了，则 continue 跳过
            const isSchedulingKeyUsed =
              usedSchedulingInfoObj[courseIndexStuArrangedKey] ||
              usedSchedulingInfoObj[courseSchedulingKey];

            if (isSchedulingKeyUsed) continue;

            // 选择当前的排课，加入path
            path.push({
              /** 排课总节数中顺序 */
              courseNumOrder,
              /** 第几节课 */
              courseIndex: curCourseIndex,
              /** 排课唯一标识 */
              courseSchedulingKey,
              /** 上课老师 */
              courseTeacher: curTeacherInfoItem.tchName,
              /** 课程 */
              course: courseZhName,
              /** 上课学生 */
              courseStudent: courseRegistrationItem.stuName,
            });

            // 标记1：第courseIndex节课该老师已经排课了
            usedSchedulingInfoObj[courseIndexTchArrangedKey] = true;

            // 标记2：第courseIndex节课该学生已经排课了
            usedSchedulingInfoObj[courseIndexStuArrangedKey] = true;

            // 标记3：记录排课唯一标识
            usedSchedulingInfoObj[courseSchedulingKey] = true;

            // 标记4：课程报名信息中该学生的该报名课程已经排课了
            courseRegistrationItem.arranged = true;

            courseNumOrder += 1;

            // # ------------------------------------------（二）做选择------------------------------------------end

            // # ------------------------------------------（三）递归进行下一次选择（进入下一层决策树）（递归，纵向遍历）------------------------------------------

            // 基于选了的当前方案item，递归（纵向遍历）
            dfs(path, curCourseIndex, curDecisionPhaseindex + 1);

            // # ------------------------------------------（四）撤销选择------------------------------------------start

            // 上一句的递归结束，回溯，将最后选的排课item pop出来
            path.pop();

            // 撤销标记1：第courseIndex节课该老师还没有排课
            delete usedSchedulingInfoObj[courseIndexTchArrangedKey];

            // 撤销标记2：第courseIndex节课该学生还没有排课
            delete usedSchedulingInfoObj[courseIndexStuArrangedKey];

            // 撤销标记3：取消记录排课唯一标识
            delete usedSchedulingInfoObj[courseSchedulingKey];

            // 撤销标记4：课程报名信息中该学生的该报名课程还没有排课
            courseRegistrationItem.arranged = false;

            courseNumOrder -= 1;

            // # ------------------------------------------（四）撤销选择------------------------------------------end
          }
        }
      }
    };

    // 递归的入口，空path传进去
    dfs([], courseIndex, decisionPhaseindex);

    // 递归结束时间点
    const endTime = new Date().getTime();
    const dfsTime = (endTime - startTime) / 1000; // 转换为秒
    console.timeEnd("myFunction"); // 将输出 "myFunction: X.XXXms"
    console.log(`递归函数从开始到结束，执行花费时间为 ${dfsTime} s`);
    console.log("repeatedSchedulingInfoObj", repeatedSchedulingInfoObj);

    console.log(`排课方案数据 ::> schedulingData`, courseSchedulingRes);

    return courseSchedulingRes;
  };
}
