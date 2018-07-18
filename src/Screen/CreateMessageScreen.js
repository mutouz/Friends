import React, { Component } from 'react'

import{
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
}from 'antd-mobile';
import MessageData from '../DataServer/MessageData';
import UserData from '../DataServer/UserData';
export default class CreateMessageScreen extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         content:'',
         files:[]
      }
    }

    //如何对需要登录的页面进行非登录访问
    componentDidMount(){
      if(!UserData.ifToken()){
          this.props.history.replace('/');
      }
    }
    
  render() {
    return (
      //发布朋友圈页面
      <div>
          <NavBar
            mode="dark"
            icon={<Icon type="left"/>}
            onLeftClick={()=>{this.props.history.goBack()}}
          >
            发消息
          </NavBar>
          <WhiteSpace/>
          <List>
              <TextareaItem
                type={'text'}
                value={this.state.content}
                onChange={(content)=>{this.setState({content})}}
                placeholder={'请输入内容'}
                autoHeight={true}
              /> 
          </List>
          <WhiteSpace/>
          <WingBlank>
          <ImagePicker
            files={this.state.files}
            onChange={(files)=>{this.setState({files})}}
            selectable={this.state.files.length<=9}
          />
          <WhiteSpace/>
          <Button
            type={'primary'}
            onClick={async()=>{
                Toast.loading('内容上传中...',0);
                const result=await MessageData.postMessage(this.state.content,this.state.files);
                Toast.hide();
                if(result.success===false){
                    Toast.fail(result.errorMessage);
                    return;
                }
                Modal.alert('提交成功','点击确认键返回',[{
                    text:'确认',
                    onPress:()=>{this.props.history.goBack()}
                }])
            }}
          >
            提交
          </Button>
          </WingBlank>
      </div>
    )
  }
}