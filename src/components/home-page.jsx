import React from 'react';

export class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h2>Home</h2>
                <div className="logoBG"><img src={require("../logo.png")} alt="Goat following farmer"/></div>
            </div>
        );
    }
}

