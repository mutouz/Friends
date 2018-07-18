import React, { Component } from 'react'
import moment from 'moment';
import './HomeMessageList.css'
import {
    imgUrl
}from '../DataServer/UrlConfig';
import{
    WingBlank, 
    WhiteSpace ,
    Card,
    Grid,
    SwipeAction
}from 'antd-mobile';

export default class HomeMessageList extends Component {
  render() {
      const images=this.props.images.map((image)=>{
          console.log(imgUrl+image.url)
          return{
              icon:imgUrl+image.url
          }
      })
    return (
        //删除信息
    <SwipeAction
        autoClose={true}
        right={[
            {
                text:'删除',
                style:{
                    backgroundColor:'red'
                },
                onPress:()=>{
                    if(this.props.del){
                        this.props.del(this.props.id);
                    }
                }
            },
        ]}
    >
      <WingBlank>
        <WhiteSpace/>
        <Card>
            <Card.Header
            title={this.props.user.nickname}
            thumb={imgUrl+this.props.user.image}
            thumbStyle={{width:'40px',height:'40px'}}   
            />
            <Card.Body>
                <span id='content'> 
                    {this.props.content}
                </span>
                <Grid
                    data={images}
                    columnNum={3}
                    hasLine={false}
                    renderItem={(image)=>{
                        return (
                                <div style={{
                                    width: '88px',
                                    height: '88px',
                                    background: `url(${image.icon}) center center /  86px 86px no-repeat` }}
                                />
                                )
                    }}
                />
            </Card.Body>
            <Card.Footer
                content={moment(this.props.createdAt).format('YYYY-MM-DD HH:mm')}
            />
        </Card>
      </WingBlank>
      </SwipeAction>
    )
  }
}