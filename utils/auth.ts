export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("auth_token");
};