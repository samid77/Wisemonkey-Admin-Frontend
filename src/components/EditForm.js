import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';

class EditForm extends Component {
  state = {
      id: '',
      namaproduk: '',
      harga: '',
      deskripsi: '',
      kodeproduk: '',
      fotoproduk1: '',
      fotoproduk2: '',
      fotoproduk3: '',
      fotoproduk4: '',
      redirect: false,
      status: '',
      subcategorylistState: '',
      datasubcategory: [],
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
      var id = this.props.location.state.productID;
      var subcategoryid = this.props.location.state.subcategoryid;

      axios.get(`http://localhost:8003/editproduct/`+id)
      .then((result) => {
          console.log(result.data);
          this.setState({
            id: result.data[0].id,
            namaproduk: result.data[0].product_name,
            harga: result.data[0].price,
            deskripsi: result.data[0].description,
            kodeproduk: result.data[0].product_code,
            fotoproduk1: result.data[0].fotoproduk_1,
            fotoproduk2: result.data[0].fotoproduk_2,
            fotoproduk3: result.data[0].fotoproduk_3,
            fotoproduk4: result.data[0].fotoproduk_4,
            subcategorylistState: result.data[0].subcategory_id,
          });
      });
      axios.get(`http://localhost:8003/getSubCatData`).then((result) => {
          this.setState({
              datasubcategory: result.data[0]
          });
      });
      
  }
  changeCategory = (e) => {
      this.setState({
          subcategoryid: e.target.value,
      });
  }
  value = (e) => {
    this.setState({
        id: e.productid.value,
        productcode: e.productcode.value,
        productname: e.productname.value,
        productprice: e.productprice.value,
        productdescription: e.productdescription.value,
        subcategoryid: e.subCatID.value,
    });
}
  updateData = (e) => {
    axios.post('http://localhost:8003/updateData/');
  }
  render() {
    const subCategoryList = this.state.datasubcategory.map((isi, index) => {
        var urutan = index + 1;
        var subCategoryID = isi.subcatid;
        var subCategoryName = isi.subcategory_name;
        return <option key={index} value={subCategoryID}>{subCategoryName}</option>
    })
    return (
      <div>
          <Header />
          <div className="content-wrapper">
            <section className="content">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Edit Product Data</h3>
                            </div>
                            {/* /.box-header */}
                            {/* form start */}
                            <form role="form">
                                <div className="box-body">
                                <input type="hidden" className="form-control" ref="productid" defaultValue={this.state.id}/>
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <input className="form-control" ref="productcode" placeholder="Product Code" type="text" defaultValue={this.state.kodeproduk}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input className="form-control" ref="productname" defaultValue={this.state.namaproduk} placeholder="Product Name" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Price</label>
                                        <input className="form-control" ref="price" placeholder="Product Price" type="text" defaultValue={this.state.harga}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Product Description</label>
                                        <input type="text" ref="productdescription" className="form-control" defaultValue={this.state.deskripsi} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <select className="form-control" ref="subCatID" name="subcategory" value={this.state.subcategorylistState} onChange={this.changeCategory}>
                                            {subCategoryList}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Foto Produk (1)</label>
                                        <input name="fotoproduk1" type="file" className="form-control" onChange={this.onchange}/>
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
                                        <input name="fotoproduk4" type="file" className="form-control" onChange={this.onchange} />
                                    </div>
                                    <ul className="todo-list">
                                        <li>
                                            {/* drag handle */}
                                            <span className="handle">
                                                <i className="fa fa-ellipsis-v" />
                                                <i className="fa fa-ellipsis-v" />
                                            </span>
                                            {/* checkbox */}
                                            <input type="checkbox" value={this.state.fotoproduk1} />
                                            {/* todo text */}
                                            <span className="text">{this.state.fotoproduk1}</span>
                                        </li>
                                        <li>
                                            {/* drag handle */}
                                            <span className="handle">
                                                <i className="fa fa-ellipsis-v" />
                                                <i className="fa fa-ellipsis-v" />
                                            </span>
                                            {/* checkbox */}
                                            <input type="checkbox" defaultValue />
                                            {/* todo text */}
                                            <span className="text">{this.state.fotoproduk2}</span>
                                        </li>
                                        <li>
                                            {/* drag handle */}
                                            <span className="handle">
                                                <i className="fa fa-ellipsis-v" />
                                                <i className="fa fa-ellipsis-v" />
                                            </span>
                                            {/* checkbox */}
                                            <input type="checkbox" defaultValue />
                                            {/* todo text */}
                                            <span className="text">{this.state.fotoproduk3}</span>
                                        </li>
                                        <li>
                                            {/* drag handle */}
                                            <span className="handle">
                                                <i className="fa fa-ellipsis-v" />
                                                <i className="fa fa-ellipsis-v" />
                                            </span>
                                            {/* checkbox */}
                                            <input type="checkbox" defaultValue />
                                            {/* todo text */}
                                            <span className="text">{this.state.fotoproduk4}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button type="button" onClick={()=> this.updateData(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Update</button>
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
export default EditForm;
