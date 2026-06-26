export const initialDummyData = {
  notificationSettings: {
    analysisCompleteKakao: false,
    analysisCompleteSms: false,
    inAppNotification: true,
    curationNotification: false,
    marketingNotification: false
  },
  inAppNotifications: [
    {
      notificationId: "noti_001",
      notificationKey: "analysis_completed:analysis_001",
      type: "analysis_completed",
      childId: "child_001",
      analysisId: "analysis_001",
      title: "AI 분석이 완료되었어요",
      message: "아이의 오늘 마음상태와 추천 코칭을 확인해보세요.",
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ],
  dismissedNotificationKeys: [],
  authUser: {
    userId: "user_001",
    nickname: "지훈이 부모님",
    email: "parent@example.com",
    loginProvider: "kakao",
    accountType: "home_guardian",
    phoneNumber: "",
    phoneVerified: false
  },
  children: [
    { id: "child_001", name: '김지훈', age: '만 4세', char: '🐶', isLocked: true, status: '정식등록' },
    { id: "child_002", name: '이지민', age: '만 3세', char: '🐱', isLocked: true, status: '정식등록' }
  ],
  analysisResults: [
    {
      analysisId: "analysis_001",
      childId: "child_001",
      analysisDate: "2026-06-20",
      videoType: "놀이 영상",
      analysisStatus: "completed",
      createdAt: "2026-06-20T10:00:00Z",
      todayMindSummary: "기분이 아주 좋아 보입니다.",
      observationMetricsJson: "[]",
      timelineEventsJson: "[]",
      playEducationResponse: "블록 놀이에 높은 몰입을 보였습니다.",
      coachingSummary: "칭찬을 많이 해주세요.",
      coachingDetail: "블록을 다 쌓았을 때 함께 기뻐해주세요."
    }
  ],
  mindRecords: [],
  coachingLogs: [],
  trashItems: [],
  consentLogs: [],
  coreInfoChangeRequests: []
};
