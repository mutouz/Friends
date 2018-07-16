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
    SearchBar
} from 'antd-mobile'
//导入要用的
import FollowData from '../DataServer/FollowData'
import UserData from '../DataServer/UserData'
import FollowItem from '../ViewComponent/FollowItem'
export default class FllowHome extends Component {
    async  componentWillMount() {
        console.log(UserData.ifToken());
        if (!UserData.ifToken()) {
            this.props.history.replace('/');
        }
        const result = await FollowData.getFollow();
        console.log(result);
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
            dataSource,
            nickname:'',
            isSearchData:false,
        }
    }
    //取消关注
    onOverFollow=async (id)=>{
      
            Toast.loading('操作中',0);
            const result = await FollowData.unFollowUser(id);
            
            if(result.success === false){
                Toast.hide();
                Toast.fail(result.errorMessage);
                return;
            }
    
            const result1 = await FollowData.getFollow();
            if(result1.success === false){
                Toast.hide();
                Toast.fail(result1.errorMessage);
                return;
            }
    
            this.setState((preState)=>{
                return{
                    dataSource:preState.dataSource.cloneWithRows(result1.data)
                }   
            },()=>{
                Toast.hide(); 
            })
       
         
    }
    //查询好友信息的方法
    onSearch=async()=>{
        this.setState({
            isSearchDate:true,
        })
        Toast.loading('查询中，请稍后',0);
        const result = await FollowData.findUser(this.state.nickname);
        Toast.hide();
        if (result.success==false) {
            Toast.fail(result.errorMessage,1)
            return;
        }
         //给列表赋值
         this.setState((preState) => {
            return {
                dataSource: preState.dataSource.cloneWithRows(result.data)
            }
        })

    }
    //点击取消时触发
    onCancel=async()=>{
        this.setState({
            nickname:'',
            isSearchData:false
        })
        const result = await FollowData.getFollow();
        if(result.success === false){
            Toast.fail(result.errorMessage);
            return;
        }
        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result.data)
            }   
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"                
                >
                    朋友圈
           </NavBar>
           
           <SearchBar
                value={this.state.nickname}
                placeholder="好友昵称"
                onSubmit={ this.onSearch}//查询到好友信息并且显示在页面上
              
              
                onCancel={this.onCancel}
       
                onChange={(nickname)=>{this.setState({nickname})}}
      />
         <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}//得到数据
            renderRow={(todo) => {
                console.log(todo)
                return (
                    <FollowItem
                    {...todo}
                    overFollow={this.onOverFollow}
                    onItemClick={(id)=>{
                        this.props.history.push('/FollowCreat/'+id);
                    }
                    }
                    />
                )
            }}
            />
            </div>
        )
    }
}
