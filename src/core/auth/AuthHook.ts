import { useModalStore } from '@/stores/modalStore'
import User from '../user/UserType'
import { registerFetch } from './AuthApi'

export const useRegister = async (user: User) => {
  const modalStore = useModalStore()

  if (
    !user.userEmail ||
    !user.userPassword ||
    !user.userName ||
    !user.userNickname ||
    !user.userPhoneNumber ||
    !user.userPasswordQuestionId ||
    !user.userPasswordAnswer
  ) {
    modalStore.openModal('basicModal', {
      title: '입력 오류',
      content: '모든 필드를 입력해주세요.',
    })
    return 0
  }

  try {
    await registerFetch(user)

    modalStore.openModal('basicModal', {
      title: '회원가입 성공',
      content: '회원가입이 완료되었습니다.',
      redirectPath: '/signin',
    })

    return 1
  } catch (error) {
    console.error('Registration error:', error)

    modalStore.openModal('basicModal', {
      title: '회원가입 실패',
      content: '회원가입 중 오류가 발생했습니다. \n 다시 시도해주세요.',
    })

    return 0
  }
}
