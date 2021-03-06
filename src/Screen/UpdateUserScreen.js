import React, { Component } from 'react'

import {
    Button,
    Toast,
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Icon,
    TextareaItem,
    Modal,
    ImagePicker
} from 'antd-mobile';

import {imgUrl} from '../DataServer/UrlConfig';
import UserData from '../DataServer/UserData';
import CustomManager from '../DataServer/CustomerData';

export default class UpdateUserScreen extends Component {

    async componentDidMount(){
            console.log(UserData.ifToken());
            if (!UserData.ifToken()) {
                this.props.history.replace('/');
            }
        const result=await CustomManager.getUser();
        console.log(result);
        if(result.success===false){
            Toast.fail(result.errorMessage,1);
            return;
        }
        this.setState({nickname:result.data.nickname,sign:result.data.sign,image:result.data.image})
        
    }

    constructor(props) {
        super(props)

        this.state = {
            nickname:'',
            sign:'',
            // files:[]
            image:''
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >修改用户信息</NavBar>
                <WhiteSpace />
                <WingBlank>
            {/* <ImagePicker
                files={this.state.files}
                onChange={(files)=>{this.setState({files})}}
                selectable={this.state.files.length < 1}
            /> */}
             <ImagePicker
                  
                  files={[{url:imgUrl+this.state.image}]}
                  onChange={(image)=>{this.setState({image})}}
                  selectable={this.state.image.length <= 1}
                  />
        </WingBlank>

             <InputItem
                type={'text'}
                value={this.state.nickname}
                onChange={(nickname)=>{this.setState({nickname})}}
                placeholder={'请输入昵称'}
             >
             昵称
             </InputItem>

             <InputItem
                type={'text'}
                value={this.state.sign}
                onChange={(sign)=>{this.setState({sign})}}
                placeholder={'请输入个性签名'}
             >
             签名
             </InputItem>

             <Button
                type={'primary'}
                onClick={this.submitMessage}
             >
                 提交修改
            </Button>

            </div>
        )
    }

    submitMessage=async()=>{
        Toast.loading('内容上传中...',0);
        const result=await CustomManager.updateUser(this.state.nickname,this.state.sign,this.state.image);
        Toast.hide();
        if(result.success===false){
            Toast.fail(result.errorMessage);
            return;
        }
        Modal.alert('修改成功','点击确认键返回',[{
            text:'确认',
            onPress:()=>{this.props.history.goBack()}
        }])
    }

}