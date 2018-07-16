import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
} from 'antd-mobile';

import userData from '../DataServer/userData';



export default class LoginScreen extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         email:'',
         password:''
      }
    }
    

  render() {
    return (
      <div>
        <NavBar
            mode="dark"
        >登录</NavBar>
        <WhiteSpace/>
        <List>
            <InputItem
                type={'text'}
                value={this.state.email}
                onChange={(email)=>{this.setState({email})}}
                placeholder={'请输入登录用户名'}
            >
                邮箱
            </InputItem>
            <InputItem
                type={'password'}
                value={this.state.password}
                onChange={(password)=>{this.setState({password})}}
                placeholder={'请输入登录密码'}
            >
                密码
            </InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={async()=>{
                    
                    const result = await userData.login(this.state.email,this.state.password);
                    console.log(result);
                    if(result.success === false){
                        Toast.fail(result.errorMessage,1);
                        return;
                    }
                    this.props.history.replace('/HomeScreen');
                }}
            >
                登录
            </Button>
            <WhiteSpace/>
            <Button
                type={'primary'}
                onClick={()=>{
                        this.props.history.push('/RegisterScreen')
                    }}
            >
                注册
            </Button>
        </WingBlank>
      </div>
    )
  }
}
