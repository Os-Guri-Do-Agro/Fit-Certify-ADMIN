export const isTokenValid = (): boolean => {
    const token = sessionStorage.getItem('token')

    if (!token) return false

    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Math.floor(Date.now() / 1000)
        
        return payload.exp > currentTime
    } catch (error) {
        console.log(error)
        return false
    }
}

export const logout = (): void => {
    sessionStorage.removeItem('token')
    window.location.href = '/login'
}

export const checkAuthAndRedirect = () => {
    if (!isTokenValid()) {
        logout()
        return '/login'
    }
    return true
}

export const getPayload = () => {
    const token = sessionStorage.getItem('token');
  
    if (!token) return false;
  
    try {
      const base64 = token.split('.')[1];
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      const payload = JSON.parse(jsonPayload);
      
      return payload;
    } catch (error) {
      console.log(error);
      return false;
    }
  };