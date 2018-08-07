import React, { Component, Fragment } from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Dropzone from 'react-dropzone';
import ReactDropzone from 'react-dropzone';
import Header from './Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class FileUpload extends Component {
  state = {
    filesToBeSent: [],
    filesPreview: [],
    printcount: 10,
    files: [],
    namaFile: [],
    fotofile: '',
    fotofile2: '',
    fotofile3: '',
    fotofile4: '',
    testinput1: '',
    testinput2: '',
  }
  onchange = (e) => {
      switch(e.target.name){
        case 'fotoproduk':
            this.setState({
                fotofile: e.target.files[0],
            });
        break;
        case 'fotoproduk2':
            this.setState({
                fotofile2: e.target.files[0],
            });
        break;
        case 'fotoproduk3':
            this.setState({
                fotofile3: e.target.files[0],
            });
        break;
        case 'fotoproduk4':
            this.setState({
                fotofile4: e.target.files[0],
            });
        break;
        default:
      }
  }
  value = (e) => {
      this.setState({
          testinput1: e.testinput1.value,
          testinput2: e.testinput2.value,
      });
  }
  executeData = (e) => {
      e.preventDefault();
      let formData = new FormData();
        formData.append('filekesatu', this.state.fotofile);
        formData.append('filekedua', this.state.fotofile2);
        formData.append('fileketiga', this.state.fotofile3);
        formData.append('filekeempat', this.state.fotofile4);
        formData.append('testinput1', this.state.testinput1);
        formData.append('testinput2', this.state.testinput2);

        axios.post(`http://localhost:8003/uploadfile`, formData);
        // window.location.reload();
  }
  onDrop2 = (files) => {
      this.setState({
          files: this.state.files.concat(files),
      });
  }
  onPreviewDrop = (files) => {
    console.log('Uploaded File: '+ files[0].name)
    this.setState({
        files: this.state.files.concat(files),
    });
    console.log(this.state.files.concat(files[0].name))
  }
  sendFileData = (e) => {
    //   e.preventDefault();
      let fileData = new FormData();
      fileData.append('fileName', this.state.files);
      axios.post(`http://localhost:8003/uploadFile`, fileData);
  }
  onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ' + acceptedFiles[0].name);
      console.log('Full files :' + acceptedFiles[0]);
      var filesToBeSent = this.state.filesToBeSent;
      if(filesToBeSent.length < this.state.printcount){
        filesToBeSent.push(acceptedFiles);
        var filesPreview = [];
        for(var i in filesToBeSent){
            filesPreview.push(<div>
                    {filesToBeSent[i][0].name}
                    <MUIThemeProvider>
                        <a href="#"><FontIcon className="material-icons customstyle" color={blue500} styles={{top: 10,}}>clear</FontIcon></a>
                    </MUIThemeProvider>
                </div>
                )
        }
        this.setState({
            filesToBeSent, filesPreview
        });
      } else {
          alert('Upload limit reached');
      }
  }
  render() {
    const previewStyle = {
        display: 'inline',
        width: 150,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
        border: '2px solid #4b7ed1',
    }
    return (
      <div>
        <Header />
            <div className="content-wrapper">
                <section className="content">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <form onSubmit={this.executeData} encType="multipart/form-data">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>Input 1</label>
                                        <input type="text" className="form-control" ref="testinput1"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Input 2</label>
                                        <input type="text" className="form-control" ref="testinput2"/>
                                    </div>
                                    <div className="form-group">
                                        <label>File I</label>
                                        <input name="fotoproduk" type="file" className="form-control" onChange={this.onchange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>File II</label>
                                        <input name="fotoproduk2" type="file" className="form-control" onChange={this.onchange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>File III</label>
                                        <input name="fotoproduk3" type="file" className="form-control" onChange={this.onchange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>File IV</label>
                                        <input name="fotoproduk4" type="file" className="form-control" onChange={this.onchange}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-flat btn-md btn-success"><i className="fa fa-upload"></i> Upload</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-body">
                                <form role="form" onSubmit={this.sendFileData()}>
                                    <div className="box-body">
                                        {/* <div className="form-group">
                                            <label>Multiple Upload Files</label>
                                            <p>You can upload upto {this.state.printcount} files</p>
                                            <Dropzone
                                                style={{width: 500, height: 200, border: '2px solid #4b7ed1', borderStyle: 'dashed'}}
                                                onDrop={(files) => this.onDrop(files)}>
                                                <center style={{margin: 30}}>Drag & drop files here or click to select files to upload</center>
                                            </Dropzone>
                                        </div> */}
                                        <div className="form-group">
                                            <label>Test Multiple Upload - DropZone II</label>
                                            <ReactDropzone 
                                                accept='.png, .jpg, .tiff, .jpeg'
                                                onDrop={this.onPreviewDrop}
                                                style={{width: 500, height: 100, border: '2px solid #4b7ed1', borderStyle: 'dashed'}}
                                            >
                                                <center style={{margin: 30}}>Drag & drop files here or click to select files to upload</center>
                                            </ReactDropzone>
                                        </div>
                                        <div className="form-group">
                                            <label>Image Preview</label>
                                            <br />
                                            {this.state.files.length > 0 &&
                                                <Fragment>
                                                    {this.state.files.map((file) => (
                                                    <img
                                                        alt="Preview"
                                                        key={file.preview}
                                                        src={file.preview}
                                                        style={previewStyle}
                                                    />
                                                    ))}
                                                </Fragment>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-md btn-flat btn-success"><i className="fa fa-upload"></i> Upload</button>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                                </form>
                                <hr style={{border: '1px solid blue'}}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
  }
}
