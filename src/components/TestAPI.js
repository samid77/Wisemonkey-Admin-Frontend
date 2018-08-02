import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
import { isIP } from 'net';

export default class TestAPI extends Component {
  state = {
      newsList: [],
  }
  componentDidMount() {
      axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=97d90855a824461a82dea9ed92371a6a`).then((getData) => {
          console.log(getData.data.articles);
          this.setState({
              newsList: getData.data.articles
          });
      })
  }
  render() {
    const newslist = this.state.newsList.map((isi, index) => {
        var index = index + 1;
        var title = isi.title;
        var author = isi.author;
        var description = isi.description;
        var urlimage = isi.urlToImage;
        return <div>
            <dl>
                <dt>Title</dt>
                <dd>{title}</dd>
                <dt>Author</dt>
                <dd>{author}</dd>
                <dt>Description</dt>
                <dd>{description}</dd>
                <dt>Image URL</dt>
                <dd>{urlimage}</dd>
            </dl>
        </div>
    })
    return (
        <div>
            <Header />
            <div className="content-wrapper">
                <section className="content">
                    {newslist}
                </section>
            </div>
        </div>
    )
  }
}
