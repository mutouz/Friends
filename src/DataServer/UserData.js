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
    async register(email,password){
        try {
            const user = {
                email,
                password
            }

            const res = await fetch(registerUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await res.json();

            if(result.success === true){
                localStorage.access_token = result.data.access_token 
            }

            return result;

        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    async login(email,password){
        try {
            const user = {
                email,
                password
            }

            const res = await fetch(loginUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await res.json();

            if(result.success === true){
                localStorage.access_token = result.data.access_token 
            }

            return result;

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
    ifToken(){
        if (localStorage.access_token==""|| !localStorage.access_token) {
            return false;
        }
        return true;
    }
    //修改密码
    async changePassword(old_password,new_password){
        try {
            const access_token = localStorage.access_token;
            const res = await fetch(changePasswordUrl,{
                access_token,
                old_password,
                new_password
            });
            const result = res.data;
            return result;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
        
    }

    

    async updateUser(userInfo){
        try {
            const access_token = localStorage.access_token;
            const formData = new FormData();
            formData.append('access_token',access_token);
            if (userInfo.nickname) {
                formData.append('nickname',userInfo.nickname);
            }
            if (userInfo.sign) {
                formData.append('sign',userInfo.sign);
            }
            if (userInfo.files) {
                formData.append('files',userInfo.files);
            }

            const res = await fetch(updateUserUrl,{
             
                method:'POST',
                data:formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            return res.data;

        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async getUserInfo(userId = 0){
        try {
            const access_token = localStorage.access_token;
            const res = await fetch(getUserUrl,{
                access_token,
                userId
            })
            return res.data;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //创建用户
async createUser(nickname,sign,images){
    try {
        console.log(1111111111111111)
        console.log(nickname+''+sign+''+images);
        const formData=new FormData();
        formData.append('access_token',localStorage.access_token);
        formData.append('nickname',nickname);
        
        formData.append('sign',sign);
        images.map((item,index)=>{
            return formData.append('image${index}',item.file);
        })
        const res=await fetch(createUserUrl,{
            method:'POST',
            body:formData
        });
        const result=await res.json();
        console.log(1111111111111111)
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
        return{
            success:false,
            errorMessage:'网络错误'
        }
    }
}
}

export default new UserData();