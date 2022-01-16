export type LoginParamsType = {
  username: string;
  password: string;
  captchaKey?: string;
  captcha?: string;
  loginKey?: string;
  type?: 'account' | 'phone';
};

export async function userLogin(): Promise<any> {
  return Promise.resolve({});
}
