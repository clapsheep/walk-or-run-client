import Challenge from '../challenge/ChallengeType'
import Goal from '../goal/GoalType'

type User = {
  userId?: string
  userEmail?: string
  userPassword?: string
  userPasswordVaild?: string
  userName?: string
  userNickname?: string
  userPhoneNumber?: string
  userPasswordQuestionId?: string
  userPasswordAnswer?: string
  userJoinDate?: string
  userWithdrawalDate?: string
  userWithdrawalStatus?: number
  challenges?: Challenge[]
  goals?: Goal[]
}
export default User
