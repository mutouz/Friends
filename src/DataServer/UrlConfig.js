const http="http://60.205.141.116:";
const pore="60004";

const imgUrl=http+pore+'/resource/image/';
const registerUrl=http+pore+'/api/register';
const loginUrl=http+pore+'/api/login';
const changePasswordUrl=http+pore+'/api/changePassword';
const createUserUrl=http+pore+'/api/createUser';
const getUserUrl=http+pore+'/api/getUser';
const updateUserUrl=http+pore+'/api/updateUser';
const postMessageUrl=http+pore+'/api/postMessage';
const deleteMessageUrl=http+pore+'/api/deleteMessage';
const findUserUrl=http+pore+'/api/findUser';
const followUrl=http+pore+'/api/follow';
const getFollowUrl=http+pore+'/api/getFollow';
const getMessageUrl=http+pore+'/api/getMessage';
const homeMessageUrl=http+pore+'/api/homeMessage';
const unFollowURL=http+pore+'/api/unFollow';

export {
    registerUrl,
    imgUrl,
    loginUrl,
    changePasswordUrl,
    createUserUrl,
    getUserUrl,
    updateUserUrl,
    postMessageUrl,
    deleteMessageUrl,
    findUserUrl,
    followUrl,
    getFollowUrl,
    getMessageUrl,
    homeMessageUrl,
    unFollowURL
}