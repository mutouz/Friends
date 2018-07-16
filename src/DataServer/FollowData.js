import React, { Component } from 'react'
import {
    findUserUrl,
    followUrl,
    unFollowURL,
    getFollowUrl
} from './UrlConfig'
class FollowData {
    ///text

   ///
    async findUser( nickname) {
        try {
            const user = { access_token:localStorage.access_token, nickname };
            const relust = await fetch(findUserUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //关注
    async followUser( userId) {
        try {
           // const user = { access_token:localStorage.access_token, userId };
            const user = { access_token:localStorage.access_token, userId };
            const relust = await fetch(followUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //取消关注
    async unFollowUser( userId) {
        try {
           // const user = { access_token:localStorage.access_token, userId };
            const user = { access_token:localStorage.access_token, userId };
            const relust = await fetch(unFollowURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //获取好友列表
    async getFollow() {
        try {
            const user = { access_token:localStorage.access_token };
            const relust = await fetch(getFollowUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
}
export default new FollowData();