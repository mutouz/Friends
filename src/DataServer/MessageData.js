import{
    postMessageUrl,
    deleteMessageUrl,
    getMessageUrl,
    homeMessageUrl
}from './UrlConfig';
class MessageData{
    async postMessage(content,images){
        try {
            const formData=new FormData();
            formData.append('access_token','1a8ec8f0f29b9599ad25ebbe3bd7bdf6');
            formData.append('content',content);
            images.map((item,index)=>{
                return formData.append('image${index}',item.file);
            })
            const res=await fetch(postMessageUrl,{
                method:'POST',
                body:formData
            });
            const result=await res.json();
            console.log(result);
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async deleteMessage(id){
        try {
            const deleteM={
                access_token:'1a8ec8f0f29b9599ad25ebbe3bd7bdf6',
                id,
            }
            const res=await fetch(deleteMessageUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(deleteM)
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
    //得到信息
    async getMessages(userId,minId){
        try {
            const get={
                access_token:'1a8ec8f0f29b9599ad25ebbe3bd7bdf6',
                userId,
                minId,
            }
            const res=await fetch(getMessageUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(get)
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

    async homeMessage(minId){
        try {
            const messages={
                access_token:'1a8ec8f0f29b9599ad25ebbe3bd7bdf6',
                minId
            }
            const res=await fetch(homeMessageUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(messages)
            });
            const result=await res.json();
            console.log(result);
            return result;
           
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
}
export default new MessageData();

