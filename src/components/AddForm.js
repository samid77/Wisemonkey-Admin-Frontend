import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class AddForm extends Component {
  state = {
      id: '',
      productcode: '',
      productname: '',
      productprice: '',
      productdescription: '',
      categorylist: [],
      subcategorylist: [],
      fotoproduk1: '',
      fotoproduk2: '',
      fotoproduk3: '',
      fotoproduk4: '',
      redirect: false,
      status: '',
  }
  onchange = (e) => {
      switch(e.target.name) {
          case 'fotoproduk1':
            this.setState({
                fotoproduk1: e.target.files[0],
            });
          break;
          case 'fotoproduk2':
            this.setState({
                fotoproduk2: e.target.files[0],
            });
          break;
          case 'fotoproduk3':
            this.setState({
                fotoproduk3: e.target.files[0],
            });
          break;
          case 'fotoproduk4':
            this.setState({
                fotoproduk4: e.target.files[0],
            });
          break;
          default:
      }
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
  value = (e) => {
      this.setState({
          productcode: e.productcode.value,
          productname: e.productname.value,
          productprice: e.productprice.value,
          productdescription: e.productdescription.value,
          subcategoryid: this.subcategory.value,
      });
  }
  saveData = (e) => {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
      formData.append('productcode', this.state.productcode);
      formData.append('productname', this.state.productname);
      formData.append('productprice', this.state.productprice);
      formData.append('productdescription', this.state.productdescription);
      formData.append('fotoproduk1', this.state.fotoproduk1);
      formData.append('fotoproduk2', this.state.fotoproduk2);
      formData.append('fotoproduk3', this.state.fotoproduk3);
      formData.append('fotoproduk4', this.state.fotoproduk4);

      axios.post(`http://localhost:8003/saveData`, formData).then(((response) => {
          var serverResponse = response.data;
          if(serverResponse === 'oke') {
              self.setState({
                  redirect: true,
              });
          } else if(serverResponse === -1){
            self.setState({
                status: 'Input data failed',
            });
          }
      }));
  }
  renderRedirect = () => {
    if (this.state.redirect){
      return <Redirect to='/productlist'/>
    }
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
    return (
      <div>
          {this.renderRedirect()}
          <Header />
          <div className="content-wrapper">
            <section className="content">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Add Product Data</h3>
                            </div>
                            {/* /.box-header */}
                            {/* form start */}
                            <form role="form" onSubmit={this.saveData} encType="multipart/form-data">
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
                                        <input className="form-control" ref="productprice" placeholder="Product Price" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Description</label>
                                        <textarea ref="productdescription" className="form-control" placeholder="Product Description" rows="4" cols="80"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <select className="form-control" ref={select => this.subcategory = select} name="subcategory">
                                            {subCategoryList}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Foto Produk (1)</label>
                                        <input name="fotoproduk1" type="file" className="form-control" onChange={this.onchange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto Produk (2)</label>
                                        <input name="fotoproduk2" type="file" className="form-control" onChange={this.onchange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto Produk (3)</label>
                                        <input name="fotoproduk3" type="file" className="form-control" onChange={this.onchange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto Produk (4)</label>
                                        <input name="fotoproduk4" type="file" className="form-control" onChange={this.onchange}/>
                                    </div>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Save Data</button>
                                </div>
                            </form>
                            </div>
                    </div>
                </div>
            </section>
          </div>
      </div>
    )
  }
}
export default AddForm;
