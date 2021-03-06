import React, { Component } from 'react';
import DashboardEditor from './components/DashboardEditor';
import DashboardList from './components/DashboardList';
import DashboardView from './components/DashboardView';
import { Switch, Route, Redirect } from 'react-router-dom';

class DashboardManager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/dashboard/create'         exact component={DashboardEditor} />
          <Route path="/dashboard/list"           exact component={DashboardList} />
          <Route path="/dashboard/list/:id"       exact component={DashboardView} />
          <Route path="/dashboard/list/:id/edit"  exact component={DashboardEditor} />
        </Switch>
      </div>
    )
  }
}


export default DashboardManager;