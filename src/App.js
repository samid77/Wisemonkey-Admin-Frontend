import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Category from './components/Category';
import ItemList from './components/ItemList';
import UserList from './components/UserList';
import EditForm from './components/EditForm';
import EditCategory from './components/EditCategory';
import EditSubCategory from './components/EditSubCategory';
import InvoiceHistory from './components/InvoiceHistory';
import SalesHistory from './components/SalesHistory';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/productlist" component={Products} />
        <Route path="/editdata" component={EditForm} />
        <Route path="/categorylist" component={Category} />
        <Route path="/itemlist" component={ItemList} />
        <Route path="/userlist" component={UserList} />
        <Route path="/invoicehistory" component={InvoiceHistory} />
        <Route path="/saleshistory" component={SalesHistory} />
        <Route path="/editcategory" component={EditCategory} />
        <Route path="/editsubcategory" component={EditSubCategory} />
      </div>
    );
  }
}

export default App;
