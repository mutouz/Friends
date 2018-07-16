import React, { Component } from 'react'

import moment from 'moment';

import {
    imgUrl
} from '../DataServer/UrlConfig'

import { 
    WingBlank, 
    WhiteSpace ,
    Card,
    SwipeAction
} from 'antd-mobile';

export default class FollowItem extends Component {
  render() {

    return (
        <SwipeAction
            autoClose={true}
            right={[
                {
                    text:'取消关注',
                    style:{
                        backgroundColor:'red',
                    },
                    onPress:()=>{
                        if(this.props.overFollow){
                           //回掉再前台直接调后台的方法
                            this.props.overFollow(this.props.id);//回掉再前台直接调后台的方法
                        }
                    }
                }
               
            ]}

        >
            <WingBlank>
                <WhiteSpace/>
                <div
                onClick={()=>{
                    console.log(this.props.id);
                    this.props.onItemClick(this.props.id);
                }}
                >
                    <Card.Header
                        title={this.props.nickname}
                        thumb={imgUrl+this.props.image}
                        extra={this.props.sign}
                    
                    />
             </div>
                
            </WingBlank>
        </SwipeAction>
    )
  }
}
