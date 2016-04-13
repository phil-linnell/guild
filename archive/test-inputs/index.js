"use strict";

import React, { Component } from 'react';
import LinkedStateMixin from 'react-addons/lib/LinkedStateMixin';
import Select from 'react-select';

class TextInputs extends Component {
  getInitialState: function() {
    let value = this.props.value
    if (!value || value == '') {
      value = [ '' ]
    }

    return {
      value: value
    }
  },
  getDefaultProps: function() {
    return {
    }
  },
  add_more: function() {
    let new_val = this.state.value.concat([])
    new_val.push('')
    this.setState({ value: new_val })
  },
  remove_item: function(i,e) {
    let new_state = this.state.value.concat([])
    new_state[i] = undefined
    this.setState({ value: new_state })
  },
  render: function() {
    let me = this

    let lines = this.state.value.map( function(e, i) {
      if (e == undefined) {
        return null
      }

      return (
        <div key={i}>
          <input defaultValue={e} />
          <button onClick={me.remove_item.bind(null, i)} >X</button>
        </div>
      )
    }).filter( function(e) {
      return e != undefined
    })

    return (
      <div>
        {lines}
        <button onClick={this.add_more}>Add More</button>
      </div>
    )
  }
};

export default TestInputs;
