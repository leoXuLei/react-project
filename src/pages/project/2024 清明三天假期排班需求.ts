import {
  ITeacherItem,
  ESubjectType,
  IStudentItem,
} from "./teachingSchedulingSystem/types/teachingScheduling";

/** 入门版测试数据一 */
export const starterEditionTestDataOne: {
  schedulingDate: string[];
  teacherCoursesInfo: ITeacherItem[];
  studentSignUpInfo: IStudentItem[];
} = {
  schedulingDate: ["2024_0404", "2024_0405", "2024_0406"],
  teacherCoursesInfo: [
    {
      tchOrder: "tch0",
      tchName: "赵老师",
      ownerCourses: [ESubjectType.Math, ESubjectType.Physics],
    },
    {
      tchOrder: "tch1",
      tchName: "李老师",
      ownerCourses: [ESubjectType.Math, ESubjectType.Chemistry],
    },
  ],
  studentSignUpInfo: [
    {
      stuOrder: "stu0",
      stuName: "王琳",
      courseInfo: [
        {
          subName: ESubjectType.Math,
          subCourseHours: 2,
        },
        {
          subName: ESubjectType.Physics,
          subCourseHours: 2,
        },
      ],
    },
    {
      stuOrder: "stu1",
      stuName: "王子铭",
      courseInfo: [
        {
          subName: ESubjectType.Math,
          subCourseHours: 2,
        },
      ],
    },
    {
      stuOrder: "stu2",
      stuName: "刘美琪",
      courseInfo: [
        {
          subName: ESubjectType.Math,
          subCourseHours: 2,
        },
        {
          subName: ESubjectType.Chemistry,
          subCourseHours: 2,
        },
      ],
    },
    {
      stuOrder: "stu3",
      stuName: "马若菲",
      courseInfo: [
        {
          subName: ESubjectType.Math,
          subCourseHours: 2,
        },
        {
          subName: ESubjectType.Physics,
          subCourseHours: 2,
        },
      ],
    },
    {
      stuOrder: "stu4",
      stuName: "王浩轩",
      courseInfo: [
        {
          subName: ESubjectType.Physics,
          subCourseHours: 2,
        },
        {
          subName: ESubjectType.Chemistry,
          subCourseHours: 2,
        },
      ],
    },
  ],
};

/** 输出：排课方案，数据结构 */
const courseSchedulingData = [
  [
    {
      /** 排课总节数中顺序 */
      courseNumOrder: 0,
      /** 第几节课 */
      courseIndex: 0,
      /** 排课唯一标识 */
      courseSchedulingKey: "0&赵老师&数学&王琳",
      /** 上课老师 */
      courseTeacher: "赵老师",
      /** 课程 */
      course: ESubjectType.Math,
      /** 上课学生 */
      courseStudent: "王琳",
    },
    {
      /** 排课总节数中顺序 */
      courseNumOrder: 1,
      /** 第几节课 */
      courseIndex: 0,
      /** 排课唯一标识 */
      courseSchedulingKey: "0&李老师&化学&刘美琪",
      /** 上课老师 */
      courseTeacher: "李老师",
      /** 课程 */
      course: ESubjectType.Chemistry,
      /** 上课学生 */
      courseStudent: "刘美琪",
    },
    {
      /** 排课总节数中顺序 */
      courseNumOrder: 2,
      /** 第几节课 */
      courseIndex: 1,
      /** 排课唯一标识 */
      courseSchedulingKey: "1&赵老师&数学&王子铭",
      /** 上课老师 */
      courseTeacher: "赵老师",
      /** 课程 */
      course: ESubjectType.Math,
      /** 上课学生 */
      courseStudent: "王子铭",
    },
    {
      /** 排课总节数中顺序 */
      courseNumOrder: 3,
      /** 第几节课 */
      courseIndex: 1,
      /** 排课唯一标识 */
      courseSchedulingKey: "1&李老师&数学&刘美琪",
      /** 上课老师 */
      courseTeacher: "李老师",
      /** 课程 */
      course: ESubjectType.Math,
      /** 上课学生 */
      courseStudent: "刘美琪",
    },

    // ...还剩5个对象，即5节课。
  ],
  [],
];
