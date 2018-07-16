import{
    createUserUrl,
    getUserUrl,
    updateUserUrl,
    changePasswordUrl,
}from './UrlConfig';

class CustomerData{
    async createUser(nickname,sign,image){
        try {
            const formData = new FormData();

            formData.append('access_token',localStorage.access_token);
            formData.append('nickname',nickname);
            formData.append('sign',sign);
            image.map((item,index)=>{
                return formData.append(`image${index}`,item.file);
            })  

            const res = await fetch(createUserUrl,{
                method:'POST',
                body:formData
            });

            const result = await res.json();

            console.log(result);

            return result;

        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }


    async getUser(userId){
        try {
            const user={
                access_token:localStorage.access_token
            }
            const res=await fetch(getUserUrl,{
              
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            })
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async updateUser(nickname,sign){
        try {
            const upadte={
                access_token:localStorage.access_token,
                nickname,
                sign
            }
            const res=await fetch(updateUserUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(upadte)
            });
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async changepassword(old_password,new_password){
        try {
            const upadte={
                access_token:localStorage.access_token,
                old_password,
                new_password
            }
            const res=await fetch(changePasswordUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(upadte)
            });
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
}

export default new CustomerData();