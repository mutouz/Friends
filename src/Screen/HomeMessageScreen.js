import React, { Component } from 'react'
import { 
    Toast,
    NavBar,
    ListView,
    PullToRefresh
} from 'antd-mobile';

import MessageData from '../DataServer/MessageData';
import HomeMessageList from '../ViewComponent/HomeMessageList';
import UserData from '../DataServer/UserData';

export default class HomeMessageScreen extends Component {
    
    async componentDidMount(){
        //验证是否已经登录，如果没有登录，不跳转其他页面
        if(!UserData.ifToken()){
            this.props.history.replace('/');
            return;
        }
        const result=await MessageData.homeMessage();
        console.log(result);
        if(result.success===false){
            Toast.fail(result.errorMessage);
            if(result.errorCode===10004){
                this.props.history.replace('/');
            }
            console.log(this.state.result)
            return;
        }
        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result.data)
            }   
        })
      
    }

    constructor(props) {
      super(props)
    
      const dataSource=new ListView.DataSource({
          rowHasChanged:(row1,row2)=>row1!==row2,
      })
      this.state = {
         dataSource,
         refreshing:false
      }
    }
    
    //刷新
    onRefresh =async()=>{
        try {
            this.setState({refreshing:true});
            const result=await MessageData.homeMessage();
            this.setState({refreshing:false});
            if(result.success===false){
                Toast.fail(result.errorMessage);
                if(result.errorCode===10004){
                    UserData.tokenOut();
                    this.props.history.replace('/');
                }
                return;
            }
            this.setState((preState)=>{
                return{
                    dataSource:preState.dataSource.cloneWithRows(result.data),
                    refreshing:false
                }
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({refreshing:false});
        }
    }
    //删除
    onDel = async (messageId) => {
        try {
            Toast.loading('操作中', 0);
            const result = await MessageData.deleteMessage(messageId);
            console.log(result)
            if (result.success == false) {
                Toast.fail(result.errorMessage);
                if (result.errorCode === 10004) {
                    UserData.tokenOut();
                    this.props.history.replace('/');
                }
                console.log(this.state.result)
                return;
            }
            const result1 = await MessageData.homeMessage();
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result1.data),
                    refreshing: false
                }
            },()=>{
                Toast.hide(); 
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({ refreshing: false });
        }


    }
  render() {
    return (
        //主页面进行信息的展示
      <div>
          <NavBar
            mode="dark"
            leftContent={[
                <span
                    key={1}
                    onClick={()=>{
                        this.props.history.replace('/');
                    }}
                >
                    退出
                </span>
            ]}
            rightContent={[
                <span
                    key={2}
                    onClick={()=>{
                        this.props.history.push('/CreateMessageScreen');
                    }}
                >
                    发消息
                </span>
            ]}
          >
            朋友圈
          </NavBar>
          <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}
            pullToRefresh={
                <PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }
            renderRow={this.renderRow}
          />
      </div>
    )
  }
  renderRow=(messages)=>{
      console.log(messages);
      return(
          <HomeMessageList
            {...messages}
            del={this.onDel}
          />
      )
  }
}