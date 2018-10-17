import React, { Component } from 'react'

class Input extends Component {
  state = { string: '', isSubmitted: false }

  updateString = event => {
    this.setState({
      string: event.target.value,
      isSubmitted: false,
    })
  }

  generate = e => {
    e.preventDefault()
    if (this.state.isSubmitted) {
      this.props.reset()
      this.setState({
        isSubmitted: false,
      })
    } else {
      this.setState({
        isSubmitted: true,
      })
      this.props.encode(this.state.string)
    }
  }

  render() {
    const { isSubmitted, string } = this.state
    return (
      <form onSubmit={this.generate}>
        <div className="input-container">
          <input
            onChange={this.updateString}
            value={this.state.string}
            disabled={isSubmitted}
            className="big-input"
          />
          {string.length ? <button className="btn" type="submit">{isSubmitted ? 'Reset' : 'Submit'}</button> : null}
        </div>
      </form>
    )
  }
}

export default Input
