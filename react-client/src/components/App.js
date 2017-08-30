import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';


const DashBoard = ()=><h2>DashBoard</h2>
const Survey = ()=><h2>Survey</h2>

class App extends React.Component{

    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        //exact means only match when route is exactly "/"
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact={true} path="/" component={Landing} />
                        <Route exact={true} path="/surveys" component={DashBoard} />
                        <Route path="/surveys/new" component={Survey} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


export default connect(null,actions)(App);