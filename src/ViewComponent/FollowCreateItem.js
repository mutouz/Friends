import React, { Component } from 'react'
import moment from 'moment';
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
export default class FollowCreateItem extends Component {
    render() {
        const data =this.props.images.map((img) => ({//寻找图片路径
            icon: imgUrl+img.url,
           
          }));
        console.log(data)
        return (
            <div
          
            >
            <SwipeAction
                autoClose={false}
             
            >
                <WingBlank>
                    <WhiteSpace/>
                    <Card>
                        <Card.Header
                            title={this.props.title}
                            thumb={imgUrl+this.props.user.image }
                            thumbStyle={{width:'40px',height:'40px'}}   
                            extra={`来自用户${this.props.user.nickname}`}
                        />
                        <Card.Body>
                            <span>
                            {this.props.content}
                           </span>
                           <Grid data={data}
                           
                        
                           columnNum={3}//一列显示3列
                           renderItem={dataItem => (
                             <div style={{ padding: '12.5px' }}>
                               <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                               <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                 <span>I am title..</span>
                               </div>
                             </div>
                           )}
                           />
                        </Card.Body>
                        <Card.Footer
                         content={moment(this.props.createdAt).format('YYYY-MM-DD HH:mm')}//显示时间
                           
                        />
                    </Card>
                </WingBlank>
            </SwipeAction>
            </div>
        )
      }
}
