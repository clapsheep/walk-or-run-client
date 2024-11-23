import * as AuthApi from './AuthApi'

export const useCheckEmailDuplicated = async (email: string) => {
  if(!email) return

  const { data } = await AuthApi.checkEmailDuplicatedFetch(email)
  return data
}
