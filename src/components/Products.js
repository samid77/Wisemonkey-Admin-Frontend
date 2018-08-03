import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


var componentConfig = {
 iconFiletypes: ['.pdf', '.jpg', '.png', '.gif', '.jpeg'],
 showFiletypeIcon: true,
 postUrl: '/uploadHandler'
}
class Products extends Component {
  state = {
      dataproduk: [],
      categorylist: [],
      subcategorylist: [],
      alert: null,
      redirect: false,
      selectedFile: null,
      quantity: [],
  }
  componentDidMount() {
      axios.get(`http://localhost:8003/productlist`)
        .then((getData) => {
            console.log(getData.data);
            this.setState({
                dataproduk: getData.data[0],
                categorylist: getData.data[1],
                subcategorylist: getData.data[2],
                quantity: getData.data[3],
            });
        });
  }
  saveData = (e) => {
    axios.post(`http://localhost:8003/saveData`, {
        productname: e.productname.value,
        productcode: e.productcode.value,
        price: e.price.value,
        description: e.productdescription.value,
        subcategoryid: this.subcategory.value,
    });
    window.location.reload();
  }
  deleteData = (e) => {
      var self = this;
      axios.post(`http://localhost:8003/deleteData`, {id: e}).then((response) => {
          var serverResponse = response.data;
          if(serverResponse === 'oke'){
                self.setState({
                    redirect: true,
                });
          } else if(serverResponse === 'gagal'){
                self.setState({
                    status: 'Data gagal dihapus',
                });
          }
      })
      window.location.reload();
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/productlist'/>
    }
  }
  fileSelectedHandler =(e) => {
    console.log(e.target.files[0]);
    this.setState({
        selectedFile: e.target.files[0],
    });
  }
  fileUploadHandler = (e) => {
      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
      axios.post(`http://localhost:8003/saveFiles`, fd, {onUploadProgress: progressEvent => {
          console.log('Upload Progress: '+ Math.round(progressEvent.loaded/ progressEvent.total * 100) + '%');
      }}).then((response) => {
          console.log(response);
      });
  }
  render() {
    const categoryList = this.state.categorylist.map((isi, index) => {
        var urutan = index + 1;
        var categoryID = isi.id;
        var categoryName = isi.category_name;
        return <option key={index} value={categoryID}>{categoryName}</option>
    });
    const subCategoryList = this.state.subcategorylist.map((isi, index) => {
        var urutan = index + 1;
        var subCategoryID = isi.subcatid;
        var subCategoryName = isi.subcategory_name;
        return <option key={index} value={subCategoryID}>{subCategoryName}</option>
    })
    const data = this.state.dataproduk.map(
        (d, index) => {
            var number = index + 1;
            var productID = d.id;
            var productCode = d.product_code;
            var productName = d.product_name;
            var productDescription = d.description;
            var price = d.price;
            var quantity = this.state.quantity;
            for(var i=0; i < quantity.length; i++){
                if(productID === quantity[i].id){
                    var quantityJos = quantity[i].quantity;
                }
            }

            return <tr key={index} style={{textAlign: 'center'}}>
            <td>{number}</td>
            <td>{productCode}</td>
            <td>{productName}</td>
            <td>{price}</td>
            <td>{quantityJos}</td>
            <td>
                <Link title="Edit Product" to={{pathname: '/editdata', state: {productID: productID}}} className="btn btn-sm btn-flat btn-warning"><i className="fa fa-pencil"></i> </Link>&nbsp;
                <button title="Delete Product" type="button" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteData(productID) }} className="btn btn-sm btn-flat btn-danger"><i className="fa fa-remove"></i> </button>&nbsp;
                <button title="Edit Quantity" data-toggle="modal" data-target="#modal-defaultQuantity" type="button" className="btn btn-success btn-sm btn-flat"><i className="fa fa-cube"></i></button>
            </td>
        </tr>
        }
    );
    return (
        <div>
            {this.renderRedirect()}
            <Header />
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>Product List</h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li className="active">Data tables</li>
                    </ol>
                </section>
            {/* Main content */}
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header">
                                {/*box-header*/}
                            </div>
                            {/* /.box-header */}
                            <div className="box-body">
                                <button data-toggle="modal" data-target="#modal-default" className="btn btn-primary btn-flat btn-md" style={{marginBottom: '20px'}}><i className="fa fa-plus-circle"></i> Add Product Data</button>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </section>
            {/* /.content */}
            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: '#0a2a6b', color: 'white'}}>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">Products Form</h4>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Product Code</label>
                                            <input className="form-control" ref="productcode" placeholder="Product Code" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input className="form-control" ref="productname" placeholder="Product Name" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Price</label>
                                            <input className="form-control" ref="price" placeholder="Product Price" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Sub Category</label>
                                            <select className="form-control" ref={select => this.subcategory = select} name="subcategory">
                                                {subCategoryList}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <input type="text" ref="productdescription" placeholder="Product Description" style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px', wordBreak: 'break-word'}}/>
                                        </div>
                                        <div className="form-group">
                                            <label>File input</label>
                                            <input type="file" onChange={this.fileSelectedHandler}/>
                                            <p className="help-block">Example block-level help text here.</p>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning btn-flat btn-md pull-left" data-dismiss="modal"><i className="fa fa-remove"></i> Close</button>
                            {/* <button type="button" onClick={()=> this.saveData(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button> */}
                            <button type="button" onClick={()=> this.fileUploadHandler} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>

            {/* Quantity form */}
            <div className="modal fade" id="modal-defaultQuantity">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">Edit Quantity</h4>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Product Code</label>
                                            <input className="form-control" ref="productcode" placeholder="Product Code" type="text" disabled/>
                                        </div>
                                        <div className="form-group">
                                            <label>Quantity Amount</label>
                                            <div className="input-group input-group-md col-xs-8">
                                                <div class="input-group-btn">
                                                    <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown"><i className="fa fa-minus-circle"></i></button>
                                                    
                                                </div>
                                                <input type="text" className="form-control" />
                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-info btn-flat btn-md"><i className="fa fa-plus-circle"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning btn-flat btn-md pull-left" data-dismiss="modal"><i className="fa fa-remove"></i> Close</button>
                            {/* <button type="button" onClick={()=> this.saveData(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button> */}
                            <button type="button" onClick={()=> this.fileUploadHandler} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        </div>
    </div>
    )
  }
}
export default Products;
