import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DocumentTitle from 'react-document-title';

import {
  Route,
} from 'react-router-dom'

import ChangePasswordScreen from './Screen/ChangePasswordScreen';
import CreateMessageScreen from './Screen/CreateMessageScreen';
import GetUserScreen from './Screen/GetUserScreen';
import HomeMessageScreen from './Screen/HomeMessageScreen';
import InformationScreen from './Screen/InformationScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import TabBarDisplay from './Screen/TabBarDisplay';
import UpdateUserScreen from './Screen/UpdateUserScreen';

import HomeMessageList from './ViewComponent/HomeMessageList';


import FollowItem from './ViewComponent/FollowItem';
import FollowHome from './Screen/FollowHome';
 import FollowCreateItem from './ViewComponent/FollowCreateItem';
 import FollowCreat from './Screen/FollowCreat';

class App extends Component {
  render() {
    return (
      
        <div >
          <Route exact path={'/'} component={LoginScreen} />
          <Route path={'/ChangePasswordScreen'} component={ChangePasswordScreen} />
          <Route path={'/CreateMessageScreen'} component={CreateMessageScreen} />
          <Route path={'/GetUserScreen'} component={GetUserScreen} />
          <Route path={'/HomeMessageScreen'} component={HomeMessageScreen} />
          <Route path={'/InformationScreen'} component={InformationScreen} />
          <Route path={'/RegisterScreen'} component={RegisterScreen} />
          <Route path={'/UpdateUserScreen'} component={UpdateUserScreen} />
          <Route path={'/TabBarDisplay'} component={TabBarDisplay} />
          
          <Route path={'/FollowHome'} component={FollowHome} />
          <Route path={'/FollowItem'} component={FollowItem} />
          <Route path={'/FollowCreat/:id'} component={FollowCreat} />
          <Route path={'/FollowCreateItem'} component={FollowCreateItem} />
          <Route path={'/HomeMessageList'} component={HomeMessageList} />

        </div>
     
    );
  }
}

export default App;
