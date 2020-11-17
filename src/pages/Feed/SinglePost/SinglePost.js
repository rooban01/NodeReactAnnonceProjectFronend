import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: '',
    prix: '',
    // categories: [
    //   { title: 'First Category', id: 0 },
    //   { title: 'Second Category', id: 1 },
    //   { title: 'Third Category', id: 2 }
    // ],
    // items: [
    //   { title: 'Item 1', id: 0, category: { id: 0 } },
    //   { title: 'Item 2', id: 1, category: { id: 0 } },
    //   { title: 'Item 3', id: 2, category: { id: 0 } },
    //   { title: 'Item 4', id: 3, category: { id: 1 } },
    //   { title: 'Item 5', id: 4, category: { id: 1 } },
    //   { title: 'Item 6', id: 5, category: { id: 2 } },
    //   { title: 'Item 7', id: 6, category: { id: 2 } }
    // ],
    // selectedCategoryId: null
    
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch('http://localhost:8080/feed/post/' + postId, {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: 'http://localhost:8080/' + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('FR'),
          content: resData.post.content,
          prix: resData.post.prix
        });
        console.log(resData.author)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
      
        <h1>{this.state.title}</h1>
        <p>Prix: {this.state.prix}</p>  
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
