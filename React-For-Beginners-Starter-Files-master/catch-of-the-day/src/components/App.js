import React, { Fragment } from "react";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import Fish from "./Fish.js";
import sampleFishes from "../sample-fishes.js";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        // 1. take a copy of the exsiting state
        const fishes = { ...this.state.fishes };
        // 2. add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state
        this.setState({
            fishes: fishes
        });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    render() { 
        return (
            <Fragment>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header tagline="Fresh Seafood Market" age={100}/>
                        <ul className="fishes">
                            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]}/>)}
                        </ul>
                    </div>
                    <Order />
                    <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
                </div>
            </Fragment>
        )
    }
}

export default App;