import React, { Fragment } from "react";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header tagline="Fresh Seafood Market" age={100}/>
                    </div>
                    <Order />
                    <Inventory />
                </div>
            </Fragment>
        )
    }
}

export default App;