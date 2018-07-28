import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-box">
            <div className="login-logo">
                <a href="index.html"><b id="brand">Wise</b>Monkey</a>
            </div>
            {/* /.login-logo */}
            <div className="login-box-body" style={{backgroundColor: '#ceffda', borderRadius: '10px', paddingTop: '20px', paddingRight: '40px', paddingLeft: '40px', paddingBottom: '40px'}}>
                <p className="login-box-msg">Sign in to admin area</p>
                <form action="index2.html" method="post">
                    <div className="form-group has-feedback">
                        <input className="form-control" placeholder="Email" type="email" />
                        <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                        <input className="form-control" placeholder="Password" type="password" />
                        <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <Link to="/dashboard" className="btn btn-success btn-block btn-flat"><i className="fa fa-paper-plane"></i> Login</Link>
                        </div>
                    </div>
                </form>
            </div>
            {/* /.login-box-body */}
        </div>
      </div>
    )
  }
}
export default Login;