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
    async register(username,password){
        try {
            const user={username,password}
            const relust=await fetch(registerUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            });
            const res=await relust.json();
            if(res.data.success){
              localStorage.access_token=res.data.access_token;
            }
            return res;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    async login(username,password){
        try {
            const user={username,password}
            const relust=await fetch(loginURL,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            });
            const res=await relust.json();
            console.log(res)
            if(res.success){
              localStorage.access_token=res.data.access_token;
            }
            return res;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //取消denglu
    tokenOut(){
        localStorage.access_token="";
    }
    //判断是否登陆
    ifToken(){
        if (localStorage.access_token=="") {
            return false;
        }
        return true;
    }
    //修改密码
    async changePassword(){
    
    }
    }
export default new UserData();