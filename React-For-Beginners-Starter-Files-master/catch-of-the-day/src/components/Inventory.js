import React, { Fragment } from "react";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";

class Inventory extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="inventory">
                    <h2>Inventory</h2>
                    {Object.keys(this.props.fishes).map(key => (
                        <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} />
                    ))}
                    <AddFishForm addFish={this.props.addFish} />
                    <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
                </div>
            </Fragment>
        )
    }
}

export default Inventory;