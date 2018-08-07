import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Category from './components/Category';
import ItemList from './components/ItemList';
import UserList from './components/UserList';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import EditCategory from './components/EditCategory';
import EditSubCategory from './components/EditSubCategory';
import InvoiceHistory from './components/InvoiceHistory';
import SalesHistory from './components/SalesHistory';
import FileUpload from './components/FileUpload';
import TestAPI from './components/TestAPI';
import StockOpname from './components/StockOpname';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/productlist" component={Products} />
        <Route path="/addproduct" component={AddForm} />
        <Route path="/editdata" component={EditForm} />
        <Route path="/categorylist" component={Category} />
        <Route path="/itemlist" component={ItemList} />
        <Route path="/userlist" component={UserList} />
        <Route path="/invoicehistory" component={InvoiceHistory} />
        <Route path="/fileupload" component={FileUpload} />
        <Route path="/saleshistory" component={SalesHistory} />
        <Route path="/editcategory" component={EditCategory} />
        <Route path="/editsubcategory" component={EditSubCategory} />
        <Route path="/testapi" component={TestAPI} />
        <Route path="/stockopname" component={StockOpname} />
      </div>
    );
  }
}

export default App;
