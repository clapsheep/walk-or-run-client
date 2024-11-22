export const validateEmailFormat = (email: string) => {
  if (!email) {
    return '이메일을 입력해주세요.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return '이메일 형식이 올바르지 않습니다.'
  } else {
    return ''
  }
}

export const passwordValidation = (password: string) => {
  if (!password) {
    return '비밀번호를 입력해주세요.'
  } else if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.'
  } else {
    return ''
  }
}

export const matchPasswordValidation = (password: string, secondPassword: string) => {
  if (secondPassword) {
    if (password !== secondPassword) {
      return '비밀번호가 일치하지 않습니다.'
    } else {
      return ''
    }
  }
  return ''
}
export const secondPasswordValidation = (password: string, secondPassword: string) => {
  if (!password) {
    return '비밀번호를 한번 더 입력해주세요.'
  } else if (password !== secondPassword) {
    return '비밀번호가 일치하지 않습니다.'
  } else {
    return ''
  }
}
export const nameValidation = (name: string, type: string) => {
  if (!name) {
    return `${type}을 입력해주세요.`
  } else {
    return ''
  }
}
export const phoneValidation = (phone: string) => {}
export const queryValidation = (query: string) => {
  if (!query) {
    return '질문을 선택해주세요.'
  } else {
    return ''
  }
}
export const queryAnswerValidation = (answer: string) => {
  if (!answer) {
    return '답변을 입력해주세요.'
  } else {
    return ''
  }
}