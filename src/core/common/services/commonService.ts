export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }
  return {
    'Authorization': `Bearer ${token}`
  }
}
