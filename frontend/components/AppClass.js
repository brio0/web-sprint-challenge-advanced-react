import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,

}

const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  state = initialState;

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch (this.state.index) {
      case 0:
        return [1, 1];
      case 1:
        return [2, 1];
      case 2:
        return [3, 1];
      case 3:
        return [1, 2];
      case 4:
        return [2, 2];
      case 5:
        return [3, 2];
      case 6:
        return [1, 3];
      case 7:
        return [2, 3];
      case 8:
        return [3, 3];
      default:
        return [2, 2];
    }

  }

  //  (1, 1) (2, 1)(3, 1)
  // (1, 2)(2, 2)(3, 2)
  // (1, 3)(2, 3)(3, 3)

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${this.getXY()})`


  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    return this.setState({
      ...this.state,
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,

    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === 'up') {
      if (this.state.index === 0 || this.state.index === 1 || this.state.index === 2) {
        return this.setState({
          ...this.state,
          index: this.state.index,
          message: `You can't go up`
        })
      } else {
        return this.setState({
          ...this.state,
          index: this.state.index - 3,
          steps: this.state.steps + 1,
          message: ''
        })
      }

    }
    if (direction === 'down') {
      if (this.state.index === 6 || this.state.index === 7 || this.state.index === 8) {
        return this.setState({
          ...this.state,
          index: this.state.index,
          message: `You can't go down`
        })
      }
      return this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
        message: ''
      })
    }
    if (direction === 'left') {
      if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
        return this.setState({
          ...this.state,
          index: this.state.index,
          message: `You can't go left`
        })
      }
      return this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
        message: ''
      })
    }
    if (direction === 'right') {
      if (this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
        return this.setState({
          ...this.state,
          index: this.state.index,
          message: `You can't go right`
        })
      }
      return this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
        message: ''
      })
    }

  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.


  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }


  setResponseError = err => this.setState({ ...this.state, message: err.response.data.message })

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const submitReset = this.setState({
      ...this.state,
      email: initialEmail,

    })
    const coordinate = this.getXY()
    axios.post(URL, { x: coordinate[0], y: coordinate[1], steps: this.state.steps, email: this.state.email })
      .then(res => {
        this.setState({ ...this.state, message: res.data.message })
        this.submitReset


      })
      .catch(this.setResponseError)

  }
  stepsMessage = () => {
    if (this.state.steps === 1) {
      return `You moved ${this.state.steps} time`
    } else {
      return `You moved ${this.state.steps} times`
    }
  }

  render() {
    const { className } = this.props



    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{this.stepsMessage()}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>

            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => { this.getNextIndex('left') }}>LEFT</button>
          <button id="up" onClick={() => { this.getNextIndex('up') }}>UP</button>
          <button id="right" onClick={() => { this.getNextIndex('right') }}>RIGHT</button>
          <button id="down" onClick={() => { this.getNextIndex('down') }}>DOWN</button>
          <button id="reset" onClick={() => { this.reset() }}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
