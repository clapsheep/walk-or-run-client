import ApiResponse from "@/core/common/types/ApiResponse";
import User from "../UserType";
import { ref, watch } from "vue";
import { setError, setLoading } from "@/core/challenge/utils/settingUtils";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import { useGetUserInfo } from "./useGetUserInfo";
import { getUserInfoFetch } from "../UserApi";

interface ChangeUserErrors {
  userId?: string;
  userName?: string;
  userEmail?: string;
  userNickname?: string;
  userPhoneNumber?: string;
}

export const useChangeProfile = (
  changeUserInfoFetch: (data: User) => Promise<ApiResponse>,
  getUserInfoFetch: () => Promise<User>
) => {
  const loading = ref(false)
  const error = ref('')
  const userStore = useUserStore()
  const { userInfo, fetchUserInfo, goToChangePassword } = useGetUserInfo(getUserInfoFetch)

  fetchUserInfo()

  const form = ref<User>({})
  const errors = ref<ChangeUserErrors>({})
  const isEditing = ref(false)

  const watchUserInputs = () => {
    // 닉네임 감시
    watch(() => form.value.userNickname, (newValue) => {
      if (!newValue?.trim()) {
        errors.value.userNickname = '닉네임을 입력해주세요';
      } else {
        errors.value.userNickname = undefined;
      }
    });

    // 휴대폰 번호 감시
    watch(() => form.value.userPhoneNumber, (newValue) => {
      if (!newValue?.trim()) {
        errors.value.userPhoneNumber = '휴대폰 번호를 입력해주세요';
      } else if (!/^01\d{9}$/.test(newValue)) {
        errors.value.userPhoneNumber = '올바른 휴대폰 번호 형식이 아닙니다';
      } else {
        errors.value.userPhoneNumber = undefined;
      }
    });
  };

  // 컴포저블 초기화 시 watch 설정
  watchUserInputs();

  const handleEdit = () => {
    form.value = {
      userId: userStore.userId ?? '',
      userName: userInfo.value.userName ?? '',
      userEmail: userInfo.value.userEmail ?? '',
      userNickname: userInfo.value.userNickname ?? '',
      userPhoneNumber: userInfo.value.userPhoneNumber ?? '',
    }
    isEditing.value = true
  }

  const handleSave = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')
    try {
      await changeUserInfoFetch(form.value)
      isEditing.value = false
      await fetchUserInfo()
    } catch (err: any) {
      setError(state, '사용자 정보를 변경하는데 실패함.')
      console.error('사용자 정보를 변경하는데 실패함:', err)
    } finally {
      setLoading(state, false)
      router.push('/mypage/profile')
    }
  }

  return {
    loading,
    error,
    userInfo,
    form,
    errors,
    isEditing,
    handleEdit,
    handleSave,
    watchUserInputs,
    goToChangePassword,
  }
}
