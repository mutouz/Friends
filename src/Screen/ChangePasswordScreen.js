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
import CustomManager from '../DataServer/CustomerData';
// import userManager from '../DataServer/CustomerData';

export default class ChangePasswordScreen extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         password:'',
         newpassword:''
      }
    }
    

    render() {
        return (
            <div>
            <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >修改密码</NavBar>
                <WhiteSpace/>

                <List>
                    
                    <InputItem
                        type={'text'}
                        value={this.state.password}
                        onChange={(password)=>this.setState({password})}
                        placeholder={'输入旧密码'}
                    >
                    旧密码
                    </InputItem>
                    <InputItem
                        type={'text'}
                        value={this.state.newpassword}
                        onChange={(newpassword)=>this.setState({newpassword})}
                        placeholder={'输入新密码'}
                    >
                    新密码
                    </InputItem>
                </List>
                <WhiteSpace/>


                <Button
                type={'primary'}
                onClick={this.submitMessage}
             >
                 提交修改
            </Button>
            <WhiteSpace/>
            <WhiteSpace/>                
            </div>
        )
    }
    submitMessage=async()=>{
        Toast.loading('内容上传中...',0);
        const result=await CustomManager.updateUser(this.state.password,this.state.newpassword);
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