import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  })

  const getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch (state.index) {
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

  const getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${getXY()})`


  }

  const reset = () => {
    // Use this helper to reset all states to their initial values.
    return setState({
      ...state,
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,

    })
  }

  const getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === 'up') {
      if (state.index === 0 || state.index === 1 || state.index === 2) {
        return setState({
          ...state,
          index: state.index,
          message: `You can't go up`
        })
      } else {
        return setState({
          ...state,
          index: state.index - 3,
          steps: state.steps + 1,
          message: ''
        })
      }

    }
    if (direction === 'down') {
      if (state.index === 6 || state.index === 7 || state.index === 8) {
        return setState({
          ...state,
          index: state.index,
          message: `You can't go down`
        })
      }
      return setState({
        ...state,
        index: state.index + 3,
        steps: state.steps + 1,
        message: ''
      })
    }
    if (direction === 'left') {
      if (state.index === 0 || state.index === 3 || state.index === 6) {
        return setState({
          ...state,
          index: state.index,
          message: `You can't go left`
        })
      }
      return setState({
        ...state,
        index: state.index - 1,
        steps: state.steps + 1,
        message: ''
      })
    }
    if (direction === 'right') {
      if (state.index === 2 || state.index === 5 || state.index === 8) {
        return setState({
          ...state,
          index: state.index,
          message: `You can't go right`
        })
      }
      return setState({
        ...state,
        index: state.index + 1,
        steps: state.steps + 1,
        message: ''
      })
    }

  }



  const onChange = (evt) => {

    // You will need this to update the value of the input.
    setState({
      ...state,
      email: evt.target.value
    })
  }
  const setResponseError = err => setState({ ...state, message: err.response.data.message })


  const onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const coordinate = getXY()

    axios.post(URL, { x: coordinate[0], y: coordinate[1], steps: state.steps, email: state.email })
      .then(res => {
        setState({
          ...state,
          message: res.data.message,
          email: ''
        })
      })
      .catch(setResponseError)

  }

  const stepsMessage = () => {
    if (state.steps === 1) {
      return `You moved ${state.steps} time`
    } else {
      return `You moved ${state.steps} times`
    }
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{stepsMessage()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>

          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => { getNextIndex('left') }}>LEFT</button>
        <button id="up" onClick={() => { getNextIndex('up') }}>UP</button>
        <button id="right" onClick={() => { getNextIndex('right') }}>RIGHT</button>
        <button id="down" onClick={() => { getNextIndex('down') }}>DOWN</button>
        <button id="reset" onClick={() => { reset() }}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" placeholder="type email" onChange={onChange} value={state.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
