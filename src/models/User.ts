import Challenge from './Challenge'
import Goal from './Goal'

interface User {
  userId?: string
  userEmail?: string
  userPassword?: string
  userPasswordVaild?: string
  userName?: string
  userNickName?: string
  userPhoneNumber?: string
  userPasswordQuestionId?: string
  userPasswordQuestionAnswer?: string
  userJoinDate?: string
  userWithdrawalDate?: string
  userWithdrawalStatus?: number
  challenges?: Challenge[]
  goals?: Goal[]
}
export default User
