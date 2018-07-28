import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

class Category extends Component {
  state = {
      categories: [],
      subcategories: [],
      
  }
  componentDidMount() {
      axios.get(`http://localhost:8003/getCatData`).then((getData) => {
          console.log(getData.data);
          this.setState({
              categories: getData.data,
          });
      });
  }
  saveCategoryData = (e) => {
    axios.post(`http://localhost:8003/saveCatData`, {
        categorycode: e.categorycode.value,
        categoryname: e.categoryname.value,
        categorydescription: e.categorydescription.value,
    });
    window.location.reload();
  }
  deleteCategory = (e) => {
      var self = this;
      axios.post(`http://localhost:8003/deleteCategory`, {id: e}).then((response) => {
          var serverResponse = response.data;
          console.log(serverResponse);
      })
      window.location.reload();
  }
  render() {
    const CategoryData = this.state.categories.map((isi, index) => {
        var urutan = index + 1;
        var IDcategory = isi.id;
        var kodeKategori = isi.category_code;
        var namaKategori = isi.category_name;
        var deskripsiKategori = isi.description;
        return <tr key={index}>
            <td>{urutan}</td>
            <td>{kodeKategori}</td>
            <td>{namaKategori}</td>
            <td>{deskripsiKategori}</td>
            <td>
                <button className="btn btn-flat btn-md btn-warning"><i className="fa fa-pencil"></i></button>&nbsp;
                <button type="button" onClick={() => { if (window.confirm('Hapus data ini?')) this.deleteCategory(IDcategory) } } className="btn btn-flat btn-md btn-danger"><i className="fa fa-remove"></i> </button>
            </td>
        </tr>
    })
    return (
      <div>
        <Header />
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <h1>Category List</h1>
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
                                <button data-toggle="modal" data-target="#modal-default-category" className="btn btn-primary btn-flat btn-md" style={{marginBottom: '20px'}}><i className="fa fa-plus-circle"></i> Add Category Data</button>
                                <table id="example2" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Category Code</th>
                                            <th>Category Name</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CategoryData}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Category Code</th>
                                            <th>Category Name</th>
                                            <th>Description</th>
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
            {/* Content Header (Page header) */}
            <section className="content-header">
                <h1>Sub Category List</h1>
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
                                <button data-toggle="modal" data-target="#modal-default-subcategory" className="btn btn-primary btn-flat btn-md" style={{marginBottom: '20px'}}><i className="fa fa-plus-circle"></i> Add Sub Category Data</button>
                                <table id="example2" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                          <td>1</td>
                                          <td>CT-001</td>
                                          <td>CT-001</td>
                                          <td>CT-001</td>
                                          <td>CT-001</td>
                                          <td>CT-001</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
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
            <div className="modal fade" id="modal-default-category">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: '#91dde0'}}>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">Category Form</h4>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Category Code</label>
                                            <input className="form-control" ref="categorycode" placeholder="Category Code" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <input className="form-control" ref="categoryname" placeholder="Category Name" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label>Category Description </label>
                                            <input className="form-control" ref="categorydescription" placeholder="Category Description" type="text"/>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning btn-flat btn-md pull-left" data-dismiss="modal">Close</button>
                            <button type="button" onClick={()=> this.saveCategoryData(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
            {/**  Sub Category Form*/}
            <div className="modal fade" id="modal-default-subcategory">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: '#5246f4', color: 'white'}}>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">Sub Category Form</h4>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Sub Category Name</label>
                                            <input className="form-control" ref="subcategoryname" placeholder="Sub Category Name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Select Category</label>
                                            <select className="form-control">
                                                <option>Category 1</option>
                                                <option>Category 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning btn-flat btn-md pull-left" data-dismiss="modal">Close</button>
                            <button type="button" onClick={()=> this.saveData(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save</button>
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
export default Category;
