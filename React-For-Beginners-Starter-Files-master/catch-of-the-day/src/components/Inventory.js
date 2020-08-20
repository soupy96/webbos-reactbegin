import React, { Fragment } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import Login from "./Login.js";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        // 1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this });
        console.log(store);
        // 2. claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // 3. set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null})
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        // check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        // to check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            )
        }

        // finally they must be the owner, just render the inventory
        return (
            <Fragment>
                <div className="inventory">
                    <h2>Inventory</h2>
                    {logout}
                    {Object.keys(this.props.fishes).map(key => (
                        <EditFishForm key={key} index={key} fish={this.props.fishes[key]} deleteFish={this.props.deleteFish} updateFish={this.props.updateFish} />
                    ))}
                    <AddFishForm addFish={this.props.addFish} />
                    <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
                </div>
            </Fragment>
        )
    }
}

export default Inventory;