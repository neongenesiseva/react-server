import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                )
            default:
                return [
                <li key="1"><Payments /></li>,
                <li key="2"><a href="/api/logout">Log Out</a></li>
                ]
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        className="left brand-logo" 
                        to={this.props.auth ? "/surveys" : "/" }>
                        React-Server
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {auth:state.auth}
}

export default connect(mapStateToProps)(Header);