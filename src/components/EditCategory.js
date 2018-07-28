import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';


class EditCategory extends Component {
  state = {
      id: '',
      category_code: '',
      category_name: '',
      deskripsi: '',
      status: <br />,
      redirect: false,
  }
  componentDidMount() {
      var id = this.props.location.state.IDcategory;
      axios.get(`http://localhost:8003/editcategory/`+id)
      .then((result) => {
          console.log(result.data);
          this.setState({
            id: result.data[0].id,
            category_code: result.data[0].category_code,
            category_name: result.data[0].category_name,
            deskripsi: result.data[0].description,
          });

      })
  }
  updateCategory = (e) => {
    var self = this;
    axios.post('http://localhost:8003/updateCategory/', {
        id: e.categoryid.value,
        category_code: e.category_code.value,
        category_name: e.category_name.value,
        description: e.description.value
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
                                <h3 className="box-title">Edit Category</h3>
                            </div>
                            {/* /.box-header */}
                            {/* form start */}
                            <form role="form">
                                <div className="box-body">
                                <input type="hidden" className="form-control" ref="categoryid" defaultValue={this.state.id}/>
                                    <div className="form-group">
                                        <label>Category Code</label>
                                        <input className="form-control" ref="category_code" placeholder="Category Code" type="text" defaultValue={this.state.category_code}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Category Name</label>
                                        <input className="form-control" ref="category_name" defaultValue={this.state.category_name} placeholder="Category Name" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input className="form-control" ref="description" placeholder="Description" type="text" defaultValue={this.state.deskripsi}/>
                                    </div>
                                </div>
                                {/* /.box-body */}
                                <div className="box-footer">
                                    <button type="button" onClick={()=> this.updateCategory(this.refs)} className="btn btn-flat btn-md btn-primary"><i className="fa fa-paper-plane"></i> Update</button>
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
export default EditCategory;
