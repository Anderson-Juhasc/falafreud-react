import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super ()

    this.state = { data: [], searchString: '' }
    this.apiUrl = 'https://diiogenes.herokuapp.com/api/v1/users'
  }

  async componentDidMount() {
    const res = await axios.get(this.apiUrl)
        , data = res.data

    this.setState({ data })
  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  }

  render() {
    let users = this.state.data;
    let searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      users = users.filter(l => {
        return l.name.toLowerCase().match( searchString );
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="filter-wrap">
          <input className='filter' type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
        </div>
        <ul className='grid'>
          {users.map(user =>
            <li className='grid__item' key={user._id}>
              <div className="media">
                <div className="media__img">
                  <img src="http://placehold.it/120x140" />
                </div>
                <div className="media__body">
                  <h2 className="media__title">{user.name}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
