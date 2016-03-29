"use strict";

var React = require('react');

var NewEventPlayer = React.createClass({
    getInitialState: function() {
        return { values: [
            {type: "translateX", x: 10},
            {type: "scaleX", x: 1.2}
        ]}
    },
    handleTypeChange: function(i, value) {
        this.state.values[i].type = value
        this.setState({ values: this.state.values })
    },
    render: function() {
        return <div>
            {this.state.values.map(function(item, i) {
                var typeLink = {
                    value: this.state.values[i].type,
                    requestChange: this.handleTypeChange.bind(null, i)
                }
                return <div className={i}>
                    <input valueLink={typeLink}/>
                    <input value={this.state.values[i].x}/>
                </div>
            }, this)}
        </div>;
    }
});

module.exports = NewEventPlayer;
