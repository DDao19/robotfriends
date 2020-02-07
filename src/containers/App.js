import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'

class App extends Component {
  constructor() {
    super()

    this.state = {
      robots: [],
      searchField: ''
    }
  }
  // grabing users from an API
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(users => {
      this.setState({ robots: users })
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }
  
  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    })
    if(!this.state.robots.length) {
      return <h1 class="loading">Loading...</h1>
    } else {
      return (
        <div className='tc'>
          <h1 class='title'>Random Robot Friends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;