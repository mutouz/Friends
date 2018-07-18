import React, { Component } from 'react'
import { 
    Button,
    WingBlank, 
    WhiteSpace,
    NavBar ,
    TabBar 
  } from 'antd-mobile';
  
  import MagesHome from './HomeMessageScreen';
  import FllowHome from './FollowHome';
  import CustomerHome from './GetUserScreen';
  

export default class TabBarDisplay extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         selected:'MagesHome'
      }
    }
    componentWillMount(){//页面加载时执行
        if(localStorage.selected){//localStorage在浏览器中的一个缓存操作方法
          this.setState({
            selected:localStorage.selected
          })
        }
      }
    
  render() {
    return (
     <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item
            title="首页"//图标下的标签
            key="MagesHome"//唯一标识
            //badge={'new'}//图标上角
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selected === 'MagesHome'}//是否被选中bool类型
          
            onPress={() => {//点击用户登记
              this.setState({
                selected: 'MagesHome',
              });
              localStorage.selected = 'MagesHome'
            }}
            >
            {/* 显示页面 */}
            <MagesHome {...this.props}/>
            </TabBar.Item>
             <TabBar.Item
            // badge={'new'}
            title="朋友圈"
            key="FllowHome"//唯一标识
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
               />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
             />
            }
            selected={this.state.selected === 'FllowHome'}
          
            onPress={() => {//点击用户登记
              this.setState({
                selected: 'FllowHome',
              });
              localStorage.selected = 'FllowHome'
            }}
            >
            {/* 显示页面 */}
            <FllowHome {...this.props}/>
            </TabBar.Item>
            <TabBar.Item
           // badge={'new'}
            title="个人信息设置"
            key="Select"//唯一标识
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selected === 'CustomerHome'}//判断是否被选中
          
            onPress={() => {//点击用信息查询
              this.setState({
                selected: 'CustomerHome',
              });
              localStorage.selected = 'CustomerHome'
            }}
            >
            {/* 显示页面 */}
            <CustomerHome {...this.props}/>
            </TabBar.Item>
          
        </TabBar>
     </div>
    )
  }
}