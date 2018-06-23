import React, { Component } from 'react';
import './App.css';
import cars from './cars.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import CarCard from './components/CarCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        cars: cars,
        unselectedCars: cars
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectCar = breed => {
        const findCar = this.state.unselectedCars.find(item => item.breed === breed);

        if(findCar === undefined) {
            // failure to select a new car
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                cars: cars,
                unselectedCars: cars
            });
        }
        else {
            // success to select a new car
            const newCars = this.state.unselectedCars.filter(item => item.breed !== breed);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                cars: cars,
                unselectedCars: newCars
            });
        }

        this.shuffleArray(cars);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cars.map(car => (
                        <CarCard
                            breed={car.breed}
                            image={car.image}
                            selectCar={this.selectCar} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

