var bizlogic = {
    
    baseUrl:"https://gdufsclub.quantacenter.com",
    // 登录
    loginUrl:"/user/login",
    // 发送邮箱获取验证码
    sendEmail:"/user/verify_code",
    // 修改密码发送邮箱
    passwordEmail:"/user/email",
    // 获取邮箱
    getEmail:"/user/origin_email",
    // 修改邮箱
    reviseEmail:"/user/email",
    // 修改密码
    revisePsw:"/user/psw",
    // 忘记密码发送邮箱
    forgetEmail:"/user/forget_psw_email",
    // 忘记密码
    forgetPsw:"/user/forget_psw",
    // 查看活动申请表
    activityDetails:"/activity/details",

    // 预览活动策划书文件
    activityFile:"/activity/url",

    // 上传logo
    uploadLogo:"/upload/logo",
    // 上传图片
    uploadFile:"/upload/oss",
//社团端
    //获取社团基本信息
    getClubBaseInfo:"/club/base_info",
    // 获取活动总览列表
    getActivitiesClub:"/activity/club_all",

    //获取社员信息
    getMembers:"/club/member",
    // 搜索社员
    searchMember:"/search/member",
    // 获取社团信息
    getClubHomeInfo:"/club/home_info",
    //修改社团信息
    reviseClubInfo:"/club/modify",
//社联端
    //获取社团信息
    getClubInfo:"/club/more_info",
    // 获取活动总览列表
    getActivitiesUnion:"/activity/union",
    // 搜索社团
    searchClub:"/search/club",
    // 获取社团列表
    getClubs:"/club/list",
    //获取审核社团列表
    getClubCheckList:"/union/club_list",
    // 获取已暂停招新的社团
    getStopClubs:"/union/stop_recruit",
    // 审核社团
    checkClub:"/union/audit_club",
    // 开启社团招新
    recruitCLub:"/union/club_recruit",
    // 注销社团
    deprecatedClub:"/union/deprecated",
    //总开关招新
    recruitClubs:"/union/recruit",
    // 开放修改注册
    openModify:"/union/open_modify_register",
    // 获取开放日期页面信息
    getOpenDate:"/union/open_info",
    //开放反选日期
    openChoose:"/union/open_choose",
// 指导老师端

    // 获取活动总览列表
    getActivitiesTeacher:"/activity/teacher_all",
    // 审核活动
    checkTeacher:"/audit/teacher_opinion",
    //获取我的信息
    getTeacherMine:"/teacher/my_info",
// 指导单位端

    // 获取活动总览列表
    getActivitiesGuide:"/activity/guide_all",
    // 审核活动
    checkGuide:"/audit/guide_opinion",
    //获取我的信息
    getGuideMine:"/guide/my_info",
// 学生端
    // 上传头像
    uploadPhoto:"/upload/profile",
    //获取基本信息
    getBaseInfoStudent:'/student/base_info',
    // 获取社团列表
    getClubsStudent:"/student/club_list",
    // 获取社团详情
    getClubInfoStudent:"/student/club_detail",
    // 获取简历模版
    getTemplate:"/student/template",
    // 新建修改简历模板
    templateOperate:"/student/template",
    // 获取报名表样式
    getResumeStyle:"/dept/format",
    // 报名修改报名表
    resumeOperate:"/resume/self",
    // 获取面试结果列表
    getResultList:"/student/process_list",
    // 获取报名表内容
    getResume:"/resume/self",
    // 获取部门列表
    getDepartments:"/dept/list",
    // 获取面试结果
    getResult:"/student/process_notice",
    // 获取反选列表
    getChooseList:"/student/reverse_list",
    // 学生反选
    studentChoose:"/student/reverse_choose"
  };
  
  var baseUrl = bizlogic.baseUrl,
  loginUrl= bizlogic.loginUrl,
  getActivitiesClub=bizlogic.getActivitiesClub,
  getActivitiesUnion=bizlogic.getActivitiesUnion,
  getActivitiesTeacher=bizlogic.getActivitiesTeacher,
  getActivitiesGuide=bizlogic.getActivitiesGuide,
  activityDetails = bizlogic.activityDetails,
  checkGuide = bizlogic.checkGuide,
  checkTeacher = bizlogic.checkTeacher,
  activityFile = bizlogic.activityFile,
  getMembers = bizlogic.getMembers,
  getClubBaseInfo = bizlogic.getClubBaseInfo,
  getClubInfo = bizlogic.getClubInfo,
  searchMember = bizlogic.searchMember,
  searchClub = bizlogic.searchClub,
  getClubs = bizlogic.getClubs,
  getTeacherMine = bizlogic.getTeacherMine,
  getGuideMine = bizlogic.getGuideMine,
  getClubHomeInfo = bizlogic.getClubHomeInfo,
  uploadLogo = bizlogic.uploadLogo,
  reviseClubInfo = bizlogic.reviseClubInfo,
  getClubCheckList = bizlogic.getClubCheckList,
  reviseEmail = bizlogic.reviseEmail,
  sendEmail = bizlogic.sendEmail,
  passwordEmail = bizlogic.passwordEmail, 
  revisePsw = bizlogic.revisePsw,
  getStopClubs = bizlogic.getStopClubs,
  checkClub = bizlogic.checkClub,
  recruitCLub = bizlogic.recruitCLub,
  deprecatedClub = bizlogic.deprecatedClub,
  recruitClubs = bizlogic.recruitClubs,
  openModify = bizlogic.openModify,
  getEmail = bizlogic.getEmail,
  getOpenDate = bizlogic.getOpenDate,
  forgetEmail = bizlogic.forgetEmail,
  forgetPsw = bizlogic.forgetPsw,
  uploadFile = bizlogic.uploadFile,
  getClubsStudent = bizlogic.getClubsStudent,
  getTemplate = bizlogic.getTemplate,
  templateOperate = bizlogic.templateOperate,
  getClubInfoStudent = bizlogic.getClubInfoStudent,
  getBaseInfoStudent = bizlogic.getBaseInfoStudent,
  getResumeStyle = bizlogic.getResumeStyle,
  resumeOperate = bizlogic.resumeOperate,
  getResultList = bizlogic.getResultList,
  getResume = bizlogic.getResume,
  getDepartments = bizlogic.getDepartments,
  uploadPhoto = bizlogic.uploadPhoto,
  getResult = bizlogic.getResult,
  getChooseList = bizlogic.getChooseList,
  studentChoose = bizlogic.studentChoose,
  openChoose = bizlogic.openChoose
module.exports = {
  baseUrl:baseUrl,
  loginUrl:loginUrl,
  getActivitiesClub:getActivitiesClub,
  getActivitiesUnion:getActivitiesUnion,
  getActivitiesTeacher:getActivitiesTeacher,
  getActivitiesGuide:getActivitiesGuide,
  activityDetails:activityDetails,
  checkGuide:checkGuide,
  checkTeacher:checkTeacher,
  activityFile:activityFile,
  getMembers:getMembers,
  getClubBaseInfo:getClubBaseInfo,
  getClubInfo:getClubInfo,
  searchMember:searchMember,
  searchClub:searchClub,
  getClubs:getClubs,
  getTeacherMine:getTeacherMine,
  getGuideMine:getGuideMine,
  getClubHomeInfo:getClubHomeInfo,
  uploadLogo:uploadLogo,
  reviseClubInfo:reviseClubInfo,
  getClubCheckList:getClubCheckList,
  reviseEmail:reviseEmail,
  sendEmail:sendEmail,
  passwordEmail:passwordEmail,
  revisePsw:revisePsw,
  getStopClubs:getStopClubs,
  checkClub:checkClub,
  recruitCLub:recruitCLub,
  deprecatedClub:deprecatedClub,
  recruitClubs:recruitClubs,
  openModify:openModify,
  getEmail:getEmail,
  getOpenDate:getOpenDate,
  forgetEmail:forgetEmail,
  forgetPsw:forgetPsw,
  uploadFile:uploadFile,
  getClubsStudent:getClubsStudent,
  getTemplate:getTemplate,
  templateOperate:templateOperate,
  getClubInfoStudent:getClubInfoStudent,
  getBaseInfoStudent:getBaseInfoStudent,
  getResumeStyle:getResumeStyle,
  resumeOperate:resumeOperate ,
  getResultList:getResultList ,
  getResume:getResume,
  getDepartments:getDepartments,
  uploadPhoto:uploadPhoto,
  getResult:getResult,
  getChooseList:getChooseList,
  studentChoose:studentChoose,
  openChoose:openChoose
};