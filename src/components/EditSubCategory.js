import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';


class EditSubCategory extends Component {
  state = {
      id: '',
      subcategory_name: '',
      category_name: '',
      status: <br />,
      redirect: false,
  }
  componentDidMount() {
      var id = this.props.location.state.IDsubcategory;
      axios.get(`http://localhost:8003/editsubcategory/`+id)
      .then((result) => {
          console.log(result.data);
          this.setState({
            id: result.data[0].subcatid,
            subcategory_name: result.data[0].subcategory_name,
            category_name: result.data[0].category_name,
          });

      })
  }
  updateSubCategory = (e) => {
    var self = this;
    axios.post('http://localhost:8003/updateSubCategory/', {
        id: e.subcategoryid.value,
        subcategory_name: e.subcategory_name.value,
        category_name: e.category_name.value,
    }).then((response) => {
      var serverResponse = response.data;
      console.log(serverResponse);
      console.log(typeof(serverResponse));
      if(serverResponse === 'oke') {
        self.setState({
          redirect: true,
        });
      }
    });
  }
  renderRedirect = () => {
    if(this.state.redirect) {
      return <Redirect to='/categorylist'/>
    }
  }
  render() {
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
                                <h3 className="box-title">Edit Sub Category</h3>
                            </div>
                            {/* /.box-header */}
                            {/* form start */}
                            <form role="form">
                                <div className="box-body">
                                <input type="hidden" className="form-control" ref="subcategoryid" defaultValue={this.state.id}/>
                                    <div className="form-group">
                                        <label>Sub Category Code</label>
                                        <input className="form-control" ref="subcategory_name" placeholder="Sub Category Name" type="text" defaultValue={this.state.subcategory_name}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Category Name</label>
                                        <input className="form-control" ref="category_name" defaultValue={this.state.category_name} placeholder="Category Name" type="text" />
                                    </div>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button type="button" onClick={()=> this.updateSubCategory(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Update</button>
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
export default EditSubCategory;
