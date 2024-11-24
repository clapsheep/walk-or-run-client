import router from "@/router";
import User from "../UserType";

export const userInfoService = {

  formatUserResponse(data: User): User {
    return {
      userId: data.userId,
      userEmail: data.userEmail,
      userName: data.userName,
      userNickname: data.userNickname,
      userPhoneNumber: data.userPhoneNumber,
      userRole: data.userRole,
      userJoinDate: data.userJoinDate,
    }
  },

  navigateToChangePassword() {
    router.push({
      name: 'my-password-change',
    })
  },

  navigateToGoalSetting() {
    router.push({
      name: 'goal-setting',
    })
  },

}
