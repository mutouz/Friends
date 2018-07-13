import React, { Component } from 'react'
import {
    loginUrl,
    registerUrl,
    changePasswordUrl,
    createUserUrl,
    getUserUrl,
    updateUserUrl
} from './UrlConfig'
class UserData {
    async register(email, password) {
        try {
            const user = { email, password }
            const relust = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            if (res.data.success) {
                localStorage.access_token = res.data.access_token;
            }
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    async login(email, password) {
        try {
            const user = { email, password }
            const relust = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res)
            if (res.success) {
                localStorage.access_token = res.data.access_token;
            }
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //取消denglu
    tokenOut() {
        localStorage.access_token = "";
    }
    //判断是否登陆
    ifToken() {
        if (localStorage.access_token == "") {
            return false;
        }
        return true;
    }

}
export default new UserData();