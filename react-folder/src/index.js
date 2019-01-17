import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

axios.get('/api/articles/').then(res => {
    class Modal extends Component {
        constructor(props) {
            super();
            this._id = props._id;
            this.index = props.index;
            this.status = false;
            this.comment = res.data[this.index].comments || false;
        }
        submitComment(event) {
            event.preventDefault();
            axios.post('/api/articles/', {
                _id: this._id,
                author: document.getElementById('nameInput').value,
                comment: document.getElementById('commentInput').value
            }).then(comment => {
                console.log(this.comment);
                console.log(comment);
                this.status = false;
                this.setState(() => false);
            }).catch(err => {
                console.log(err);
            })
        }
        displayModal() {
            this.status = true;
            this.setState(() => true);
        }
        render() {
            if (this.status && this.comment) {
                return (
                    <div className='modal' id={this._id}>
                        <form>
                            <h2>Please input your name</h2>
                            <input id='nameInput'/>
                            <br />
                            <h2>Tell us what you think!</h2>
                            <textarea id='commentInput'/>
                            <button onClick={this.submitComment.bind(this)} className='comment'>Submit Comment!</button>
                        </form>
                        <div id='previousComments'>
                            <h2 id='comments'>Other Comments!</h2>
                            {this.comment.map(note => <div className='oldComment' key={Math.floor(Math.random() * 100)}><h4>{note.author}:</h4><h4>{note.body}</h4></div>)}
                        </div>
                    </div>
                );
            } else if (this.status) {
                return (
                    <div className='modal' id={this._id}>
                        <form>
                            <input id='nameInput'/>
                            <textarea id='commentInput'/>
                            <button onClick={this.submitComment.bind(this)} className='comment'>Submit Comment!</button>
                        </form>
                    </div>
                );
            } else {
                return (
                    <button onClick={this.displayModal.bind(this)} className='comment'>Comment on this Article!</button>
                )
            };
        };
    }
    class Card extends Component {
        constructor(props) {
            super();
            this._id = props._id;
            this.index = props.index;
            // this.divId = props.divId;
            this.headline = props.headline;
            this.genre = props.genre;
            this.url = props.url;
            this.imageUrl = props.imageUrl;
            // this.buttonId = props.buttonId
        }
        render() {
            return(
                // <div className='card' id={this.divId}>
                <div className='card' id={this._id}>
                    <h2 className='headline'>{this.headline}</h2>
                    <h3 className='genre'>{this.genre}</h3>
                    <a href={this.url} className='image'><img src={this.imageUrl}/></a>
                    <Modal _id={this._id} index ={this.index}/>
                    {/* <button onClick={this.displayModal} id={this.buttonId} className='comment'>Comment on this Article!</button> */}
                </div>
            );
        }
    }
    class Container extends Component {
        render() {
            return (
                <div id='container'>
                    {res.data.map((card, index) => <Card key={card._id} _id = {card._id} index ={index} headline = {card.headline} genre = {card.genre} url = {card.url} imageUrl = {card.imageUrl}/>)}
                </div>
             );
        }
    }
    class App extends Component {
        constructor(props) {
          super(props);
          this.state = {}
          this.connecToServer = this.connecToServer.bind(this);
        }
        connecToServer() {
          fetch('/');
        }
      
        componentDidMount() {
          this.connecToServer();
        }
        render() {
          return (
            <Router>
               {/* <Navbar /> */}
               <Route exact path="/" component={Container} />
               {/* <Footer /> */}
            </Router>
          );
        }
      }
    ReactDOM.render(<App />, document.getElementById('root'));
}).catch(err => console.log(err));

