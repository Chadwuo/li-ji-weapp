import { request } from "../request";

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function apiLoginPost(code: string) {
  return request<Api.User.LoginToken>({
    url: "/wechat/login",
    method: "POST",
    data: {
      code,
    },
  });
}

/** Get user info */
export function apiUserInfoGet() {
  return request<Api.User.LoginUser>({
    url: "/auth/get-user-info",
  });
}
