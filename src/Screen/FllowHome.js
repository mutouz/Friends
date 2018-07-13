import React, { Component } from 'react'
import {
    Button,
    View,
    ListView,
    WhiteSpace,
    NavBar,
    WingBlank,
    InputItem,
    Toast
} from 'antd-mobile'
//导入要用的
import FollowData from '../DataServer/FollowData'
import UserData from '../DataServer/UserData'
import FllowItem from '../ViewComponent/FollwItem'
export default class FllowHome extends Component {
    async  componentWillMount() {
        console.log(UserData.ifToken());
        if (!UserData.ifToken()) {
            this.props.history.replace('/');
        }
        const result = await FollowData.getFollow();
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
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={[
                        <span
                            key={1}
                            onClick={
                                () => {
                                    this.props.history.replace('');
                                }
                            }
                        >后退</span>
                    ]}
                    rightContent={[
                        <span
                            key={1}
                            onClick={
                                () => {
                                    this.props.history.push("/CreateComment", { messageId: this.props.history.location.state.messageId });

                                }
                            }
                        >发消息</span>
                    ]}
                >
                    朋友圈
           </NavBar>
              
            </div>
        )
    }
}
