import React, { Component } from 'react'
import {
    Button,
    View,
    ListView,
    WhiteSpace,
    NavBar,
    WingBlank,
    InputItem,
    Toast,
    PullToRefresh
} from 'antd-mobile'
import UserData from '../DataServer/UserData'
import MessageData from '../DataServer/MessageData'
import FollowData from '../DataServer/FollowData'
import FollowCreateItem from '../ViewComponent/FollowCreateItem'
export default class FollowCreate extends Component {
    async  componentWillMount() {
        console.log(UserData.ifToken());
        // if (!UserData.ifToken()) {
        //     this.props.history.replace('/');
        // }
        ///////////////////////////////////
        /////得到传过来的id
        const result = await MessageData.getMessages(this.props.match.params.id);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (!result.success) {
            Toast.fail(result.errorMessage);
            return;
        }
        //给列表赋值
        this.setState((preState) => {
            return {
                dataSource: preState.dataSource.cloneWithRows(result.data)
            }
        })

    }
    constructor(props) {
        super(props)
        //付初始值
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        //1.定义一个容器
        this.state = {
            dataSource
        }
    }
    onFollow=async()=>{
        try {
             ///////////////////////////////////
        /////得到传过来的id关注
            const result=await FollowData.followUser(this.props.match.params.id);
              ///////////////////////////////////
        /////得到传过来的id
        
            if(result.success===false){
                Toast.fail(result.errorMessage);
                if(result.errorCode===10004){
                    this.props.history.replace('/');
                }
                return;
            }
          else{
            Toast.fail("关注成功");
            this.props.history.push('/FollowHome');
          }
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({refreshing:false});
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
                    onClick={()=>{
                        this.props.history.goBack();
                    }}
                >
                    后退
                </span>
            ]}
            rightContent={[
                <span
                    key={2}
                    onClick={this.onFollow}
                >
                    关注
                </span>
            ]}
          >
            {}
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
            renderRow={(user) => {
                console.log(user)
                return (
                    <FollowCreateItem
                    {...user}
                   
                    />
                )
            }}
          />
      </div>
    )
  }
}
