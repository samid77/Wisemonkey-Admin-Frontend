import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div>
            <header className="main-header">
                <a href="index.html" className="logo">
                    <span className="logo-mini">
                        <b id="brand">W</b>M
                    </span>
                    {/* logo for regular state and mobile devices */}
                    <span className="logo-lg">
                        <b id="brand">Wise</b>Monkey
                    </span>
                </a>
                <nav className="navbar navbar-static-top" id="navBar">
                    {/* Sidebar toggle button*/}
                    <a className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </a>
                    <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        {/* Notifications Menu */}
                        <li className="dropdown notifications-menu">
                            {/* Menu toggle button */}
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell-o" />
                                <span className="label label-warning">10</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 10 notifications</li>
                                    <li>
                                    {/* Inner Menu: contains the notifications */}
                                    <ul className="menu">
                                        <li>
                                            {/* start notification */}
                                            <a>
                                                <i className="fa fa-users text-aqua" /> 5 new members joined today
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the page and may cause design problems
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <i className="fa fa-users text-red" /> 5 new members joined
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <i className="fa fa-shopping-cart text-green" /> 25 sales made
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <i className="fa fa-user text-red" /> You changed your username
                                            </a>
                                        </li>
                                        {/* end notification */}
                                    </ul>
                                </li>
                                <li className="footer">
                                    <a>View all</a>
                                </li>
                            </ul>
                        </li>
                        {/* User Account Menu */}
                        <li className="dropdown user user-menu">
                            {/* Menu Toggle Button */}
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                {/* The user image in the navbar*/}
                                <img src="dist/img/samid.png" className="user-image" alt="User Image" />
                                {/* hidden-xs hides the username on small devices so only the image appears. */}
                                <span className="hidden-xs">Dimas Septyanto</span>
                            </a>
                            <ul className="dropdown-menu">
                                {/* The user image in the menu */}
                                <li className="user-header">
                                    <img src="dist/img/samid.png" className="img-circle" alt="User Image" />
                                    <p>
                                        Dimas Septyanto
                                        <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                {/* Menu Body */}
                                {/* Menu Footer*/}
                                <li className="user-footer">
                                    <div className="text-center">
                                        <a href="profile.html" className="btn btn-primary btn-flat" style={{marginTop: 10}}>
                                        <i className="fa fa-black-tie" /> Profile</a>&nbsp;
                                        <Link to="/" className="btn btn-danger btn-flat" style={{marginTop: 10}}>
                                        <i className="fa fa-sign-out" /> Sign out</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
            <aside className="main-sidebar">
                <section className="sidebar">
                    {/* Sidebar user panel */}
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="dist/img/samid.png" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Dimas Septyanto</p>
                            <a>
                            <i className="fa fa-circle text-success" /> Online</a>
                        </div>
                    </div>
                    {/* search form */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input name="q" className="form-control" placeholder="Search..." type="text" />
                            <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                                <i className="fa fa-search" />
                            </button>
                            </span>
                        </div>
                    </form>
                    {/* /.search form */}
                    {/* sidebar menu: : style can be found in sidebar.less */}
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-dashboard" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productlist">
                                <i className="fa fa-cubes" />
                                <span>Products List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/itemlist">
                                <i className="fa fa-th" />
                                <span>Item List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/stockopname">
                                <i className="fa fa-archive" />
                                <span>Stock Opname</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categorylist">
                                <i className="fa fa-tags" />
                                <span>Category List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/userlist">
                                <i className="fa fa-user" />
                                <span>User List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/fileupload">
                                <i className="fa fa-file" />
                                <span>File Upload Test</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/invoicehistory">
                                <i className="fa fa-print" />
                                <span>Invoice History</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/saleshistory">
                                <i className="fa fa-shopping-cart" />
                                <span>Sales History</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        </div>
    )
  }
}
export default Header;
