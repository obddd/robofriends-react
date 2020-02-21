import React from 'react';
import CardList from '../Components/CardList';
// import { robots } from './robots'   Fetching from api
import Searchbox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import './App.css';
import ErrorBoundary from '../Components/ErrorBoundary';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            searchfield: '',
            robots: []
        }
        // this.searchChange = this.searchChange.bind(this) use this searchchange isnt arrow function
    }

    searchChange = (event) => {

        this.setState({
            searchfield: event.target.value
        })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

    render() {
        const filteredRobots = this.state.robots.filter(
            robots => {
                return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
            }
        )
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>

                <Searchbox searchChange={this.searchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>

            </div>
        )
    }
}


export default App;