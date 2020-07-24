import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';
import Router from "next/router";

export class AuthToken {
  constructor(token) {
    // we are going to default to an expired decodedToken
    this.decodedToken = {sub: "", exp: 0};
    this.token = token;

    // then try and decode the jwt using jwt-decode
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {
      console.log(e);
    }
  }

  authorizationString() {
    return `${this.token}`;
  }

  expiresAt() {
    return new Date(this.decodedToken.exp * 1000);
  }

  isExpired() {
    if (!this.token) return true;
    return new Date() > this.expiresAt();
  }

  isValid() {
    return !this.isExpired();
  }

  static async storeToken(token, routeToRedirect) {
    Cookies.set('token', token);
    return await Router.push(routeToRedirect);
  }
}
