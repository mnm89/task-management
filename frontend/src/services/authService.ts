import axios from "axios";
const API_URL =
  process.env.REACT_APP_LOGIN_API_URL ?? "http://localhost:3000/api/login";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { username, password });
    const { token } = response.data;

    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Invalid login credentials");
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
  window.location.reload();
};
