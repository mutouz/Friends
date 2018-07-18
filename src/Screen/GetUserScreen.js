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



export default class GetUserScreen extends Component {

    async componentDidMount(){
        const result=await CustomManager.getUser();
        console.log(result);
        if(result.success===false){
            Toast.fail(result.errorMessage,1);
            return;
        }
        this.setState({nickname:result.data.nickname,sign:result.data.sign,image:result.data.image})
          console.log(imgUrl+this.state.image)
    }

    constructor(props) {
      super(props)
    
      this.state = {
         nickname:'',
         sign:'',
         image:''
      }
    }
    

    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={[
                        <span
                            key={1}
                            onClick={() => {
                                this.props.history.replace('/');
                                {/* CustomManager.logout(); */}
                            }}
                        >退出</span>
                    ]}
                >个人资料</NavBar>
                <WhiteSpace/>

            
                <List>
                    
                    <ImagePicker
                  
                    files={[{url:imgUrl+this.state.image}]}
                    onChange={(image)=>{this.setState({image})}}
                    selectable={this.state.image.length <= 1}
                    />
                    <InputItem
                        type={'text'}
                        value={this.state.nickname}
                        onChange={(nickname)=>this.setState({nickname})}
                        placeholder={'昵称'}
                    >
                    昵称
                    </InputItem>
                    <InputItem
                        type={'text'}
                        value={this.state.sign}
                        onChange={(sign)=>this.setState({sign})}
                        placeholder={'个性签名'}
                    >
                    签名
                   
                    </InputItem>
                </List>
                <WhiteSpace/>


                <Button
                    type={'primary'}
                    onClick={() => {
                        this.props.history.push('/UpdateUserScreen',this.state.nickname,this.state.sign,this.state.image);
                        
                    }}
                >
                    修改个人信息
            </Button>
            <WhiteSpace/>
            <WhiteSpace/>
                <Button
                    onClick={async() => {
                        this.props.history.push('/ChangePasswordScreen');
                    }}
                >
                    修改密码
            </Button>
            <WhiteSpace/>
            <WhiteSpace/>
                <Button
                    type={'warning'}
                    onClick={async() => {
                        this.props.history.replace('/');
                    }}
                >
                    退出登录
            </Button>
            </div>
        )
    }
}