import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import Fish from "./Fish.js";
import sampleFishes from "../sample-fishes.js";
import base from "../base.js";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const {params} = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        console.log(this.state.order)
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

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

    updateFish = (key, updateFish) => {
        // 1. Take a copy of the current state
        const fishes = {...this.state.fishes};
        // 2. update that state
        fishes[key] = updateFish;
        // 3. set that to state
        this.setState({fishes});
    }

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = {...this.state.fishes}
        // 2. update the state
        fishes[key] = null;
        // 3. update state
        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. call setState to update our state object
        this.setState({order: order});
    }

    removeFromOrder = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. remove that item from order
        delete order[key];
        // 3. call setState to update our state object
        this.setState({ order: order });
    }

    render() { 
        return (
            <Fragment>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header tagline="Fresh Seafood Market" age={100}/>
                        <ul className="fishes">
                            {Object.keys(this.state.fishes).map(key => 
                                <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                            )}
                        </ul>
                    </div>
                    <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order} />
                    <Inventory storeId={this.props.match.params.storeId} fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes}/>
                </div>
            </Fragment>
        )
    }
}

export default App;