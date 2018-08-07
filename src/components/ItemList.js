import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { isIP } from 'net';
import { isObject } from 'util';

/**
 * 
 *  1. Terima parameter jumlah item yang dimasukan
 *  2. Looping kode item sejumlah item yang dimasukan
 *  3. Insert ke database, hasil looping ditambah dengan product id yang diterima.
 * 
 * 
 */

class ItemList extends Component {
  state = {
      itemlist: [],
      productList: [],
  }
  componentDidMount() {
      axios.get(`http://localhost:8003/itemlist`).then((getData) => {
          console.log(getData.data);
          this.setState({
              itemlist: getData.data[0],
              productList: getData.data[1],
          });
      })
  }
  render() {
    const productList = this.state.productList.map((isi, index) => {
        var urutan = index + 1;
        var idproduk = isi.id;
        var productname = isi.product_name;
        return <option key={urutan} value={idproduk}>{productname}</option>
    });
    const itemList = this.state.itemlist.map((isi, index) => {
        var urutan = index + 1;
        var id = isi.id;
        var itemID = isi.item_id;
        var namaProduk = isi.product_name;

        return <tr key={index} style={{textAlign: 'center'}}>
        <td>{urutan}</td>
        <td>{itemID}</td>
        <td>{namaProduk}</td>
        <td>
            <Link to={{pathname: '/editdata', state: {id: id}}} className="btn btn-sm btn-flat btn-warning"><i className="fa fa-pencil"></i> </Link>&nbsp;
            <button type="button" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteData(id) }} className="btn btn-sm btn-flat btn-danger"><i className="fa fa-remove"></i> </button>
        </td>
    </tr>
    })
    return (
      <div>
        <Header />
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>Product Item List</h1>
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
                                <button data-toggle="modal" data-target="#modal-defaultQuantity" className="btn btn-primary btn-flat btn-md" style={{marginBottom: '20px'}}><i className="fa fa-plus-circle"></i> Add Product Item Data</button>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Item Code</th>
                                            <th>Product Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Item Code</th>
                                            <th>Product Name</th>
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
                                            <label>Product Name</label>
                                            <select className="form-control" ref={select => this.productname = select} name="productname">
                                                {productList}
                                            </select>
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
            {/* End of Quantity form */}
        </div>
      </div>
    )
  }
}
export default ItemList;
