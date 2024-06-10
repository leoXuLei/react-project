// -----------------------------------课程相关-------------

/* eslint-disable no-unused-vars */
export enum ESubjectType {
  /** 数学 */
  Math = 0,
  /** 英语 */
  English = 1,
  /** 物理 */
  Physics = 2,
  /** 化学 */
  Chemistry = 3,
  /** 生物 */
  Biologyg = 4,
}

export const SUBJECT_TYPE_ZHCH_MAP = new Map([
  [ESubjectType.Math, "数学"],
  [ESubjectType.English, "英语"],
  [ESubjectType.Physics, "物理"],
  [ESubjectType.Chemistry, "化学"],
  [ESubjectType.Biologyg, "生物"],
]);

/** 学科（不需要嘛？） */

export interface ISubjectItem {
  /** 科目名称 */
  subName: ESubjectType;
}

// -----------------------------------老师相关-------------

/** 老师 */
export interface ITeacherItem {
  /** 老师序号，如tch0~10 */
  tchOrder?: string;
  /** 老师姓名 */
  tchName: string;
  /** 该老师负责教授的课程 */
  ownerCourses: ESubjectType[];
  // 暂不考虑老师有时间方面的要求
}

// -----------------------------------学生相关-------------

/** 学生 */
export interface IStudentItem {
  /** 学生序号，如stu0~10 */
  stuOrder?: string;
  /** 学生姓名 */
  stuName: string;
  /** 学生-报名课程信息 */
  courseInfo: IStuSignUpCourseItem[];
  /** 学生-排课特殊要求信息  */
  scheduleCourseReqInfo?: IStuScheduleCourseReqItem[];
}

/** 学生-报名课程信息 */
export interface IStuSignUpCourseItem {
  /** 科目名称 */
  subName: ESubjectType;
  /** 该科目在排班所在日期间需要上的课时数，默认2H即=2节课? */
  subCourseHours?: number;
  /** 期望指定来上该科目课的老师 */
  expectedCourseTeacher?: string;
}

/** 学生-排课特殊要求信息 */
export interface IStuScheduleCourseReqItem {
  /** 科目名称 */
  subName: ESubjectType;
  /** 期望指定来上该科目课的老师 */
  expectedCourseTeacher?: string;
  /** 不能安排该科目的时间段，格式如'2024_0404&_08_09' 表示4月4号的8点到9点不能上课 */
  unableToScheduleTime?: string[];
  /** 必须安排该科目的时间段，格式如'2024_0404&_16_18' 表示必须在4月4号的16点到18点上课 */
  mustToScheduleTime?: string[];
}

// -----------------------------------【排课信息】-------------

export interface ICourseSchedulingItem {
  /** 排课唯一标识：`日期&上课时间段&授课老师&课程名称&学生（暂时改成 `第几节课&授课老师&课程名称&学生`）` */
  courseSchedulingKey: string;
  /** 上课日期：如2024_0404（暂时改成可选，后续再改回来） */
  courseDate?: string;
  /** 上课时间段类型：如[_08_09, _09_10]（暂时改成可选，后续再改回来） */
  courseTime?: ECourseTimeType[];
  /** 上课老师 */
  courseTeacher: string;
  /** 课程 */
  course: ESubjectType;
  /** 上课学生 */
  courseStudent: string;
}

// -----------------------------------其它-------------

/** 上课时间段类型 */

export enum ECourseTimeType {
  /** 上课时间 08:00-09:00，第1节课 */
  _08_09 = 1,
  /** 上课时间 09:00-10:00，第2节课 */
  _09_10 = 2,
  /** 上课时间 10:00-11:00，第3节课 */
  _10_11 = 3,
  /** 上课时间 11:00-12:00，第4节课 */
  _11_12 = 4,
  /** 上课时间 12:00-13:00，第5节课 */
  _12_13 = 5,
  /** 上课时间 13:00-14:00，第6节课 */
  _13_14 = 6,
  /** 上课时间 14:00-15:00，第7节课 */
  _14_15 = 7,
  /** 上课时间 15:00-16:00，第8节课 */
  _15_16 = 8,
  /** 上课时间 16:00-17:00，第9节课 */
  _16_17 = 9,
  /** 上课时间 17:00-18:00，第10节课 */
  _17_18 = 10,
  /** 上课时间 18:00-19:00，第11节课 */
  _18_19 = 11,
  /** 上课时间 19:00-20:00，第12节课 */
  _19_20 = 12,
  /** 上课时间 20:00-21:00，第13节课 */
  _20_21 = 13,
}

// -----------------------------------其它1-------------

/** 学生-报名课程信息 & 学生信息 */
export interface IStuSignUpCourseTotalItem extends IStuSignUpCourseItem {
  /** 学生序号，如stu0~10 */
  stuOrder?: string;
  /** 学生姓名 */
  stuName: string;
  /** 该报名课程是否已经排课了 */
  arranged?: boolean;
}
