import type User from '@/core/user/UserType'

export interface ValidationErrors {
  userEmail?: string
  userName?: string
  userNickname?: string
  userPhoneNumber?: string
  userPassword?: string
  userPasswordConfirm?: string
  userPasswordQuestionId?: string
  userPasswordAnswer?: string
  challengeCategoryCode?: string
  challengeCategoryUnitCode?: string
  targetAmount?: string
  startDate?: string
  endDate?: string
}

export interface EmailValidationResult {
  isValid: boolean
  message: string
}


export const validateEmailFormat = (email: string|undefined): EmailValidationResult => {
  if (!email) {
    return { isValid: false, message: '이메일을 입력해주세요.' }
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: '이메일 형식이 올바르지 않습니다.' }
  } else {
    return { isValid: true, message: '' }
  }
}


export const validateRequired = (value: string | undefined, fieldName: string): string => {
  if (!value?.trim()) return `${fieldName}을(를) 입력해주세요.`
  return ''
}

export const validatePassword = (password: string | undefined): string => {
  if (!password) return '비밀번호를 입력해주세요.'
  if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다.'
  return ''
}

export const validatePasswordMatched = (
  password: string | undefined,
  confirmPassword: string | undefined
): string => {
  if (!confirmPassword) return '비밀번호를 한번 더 입력해주세요.'
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.'
  return ''
}

export const validatePasswordQuestion = (questionId: string | undefined): string => {
  if (!questionId) return '비밀번호 찾기 질문을 선택해주세요.'
  return ''
}

export const validatePasswordAnswer = (answer: string | undefined): string => {
  if (!answer?.trim()) return '비밀번호 찾기 답변을 입력해주세요.'
  return ''
}

export const validatePhoneNumber = (phone: string | undefined): string => {
  if (!phone) return '전화번호를 입력해주세요.'
  if (!/^01\d{9}$/.test(phone)) return '-(하이픈) 없이 입력해주세요.'
  return ''
}

export const validateNumber = (value: number | undefined, fieldName: string, min?: number, max?: number): string => {
  if (value === undefined || value === null) {
    return `${fieldName}을(를) 입력해주세요.`
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return `${fieldName}은(는) 숫자여야 합니다.`
  }
  
  if (min !== undefined && value < min) {
    return `${fieldName}은(는) ${min} 이상이어야 합니다.`
  }
  
  if (max !== undefined && value > max) {
    return `${fieldName}은(는) ${max} 이하여야 합니다.`
  }
  
  return ''
}

export const validateDate = (value: string | undefined, fieldName: string): string => {
  if (!value) {
    return `${fieldName}을(를) 선택해주세요.`
  }
  
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return `${fieldName}이(가) 올바르지 않습니다.`
  }
  
  return ''
}

export const validateDateRange = (startDate: string | undefined, endDate: string | undefined): string => {
  if (!startDate || !endDate) return ''
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start > end) {
    return '종료일은 시작일보다 늦어야 합니다.'
  }
  
  return ''
}

export const validateSelect = (value: string | number | undefined, fieldName: string): string => {
  if (!value && value !== 0) {
    return `${fieldName}을(를) 선택해주세요.`
  }
  return ''
}

export const validateRegisterForm = (form: User): ValidationErrors => {
  const errors: ValidationErrors = {}

  errors.userEmail = validateEmailFormat(form.userEmail).message
  errors.userName = validateRequired(form.userName, '이름')
  errors.userNickname = validateRequired(form.userNickname, '닉네임')
  errors.userPhoneNumber = validatePhoneNumber(form.userPhoneNumber)
  errors.userPassword = validatePassword(form.userPassword)
  errors.userPasswordConfirm = validatePasswordMatched(form.userPassword, form.userPasswordConfirm)
  errors.userPasswordQuestionId = validatePasswordQuestion(form.userPasswordQuestionId)
  errors.userPasswordAnswer = validatePasswordAnswer(form.userPasswordAnswer)

  return errors
}

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== '')
}
