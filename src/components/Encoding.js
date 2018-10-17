import React, { Component } from 'react'

class Encoding extends Component {
  state = {
    remaining: this.props.encode.string,
    decode: [],
    current: '',
    time: 0,
    string: '',
  }

  componentDidMount() {
    const {
      type,
      encode: { string, length },
    } = this.props
    if (length) {
      this.buildFixedString(string, length)
    } else {
      this.buildString(string)
    }
  }

  buildFixedString = (remaining, length) => {
    let current = remaining.substring(0, length)
    this.setState(prevState => {
      prevState.current = current
      return prevState
    })
    const char = this.props.encode.map[current]
    if (char) {
      this.setState(({ decode, string }) => {
        decode.pop()
        decode.push({
          code: current,
          char,
        })
        string = `${string}${char}`
        return { decode, string }
      })
    }
    remaining = remaining.slice(length)
    if (remaining.length > 0) {
      this.setState(prevState => {
        prevState.time += 1
        prevState.decode.push({
          code: current,
        })
        setTimeout(() => {
          this.buildFixedString(remaining, length)
        }, this.props.delay)
        return prevState
      })
    } else {
      this.setState(prevState => {
        prevState.time += 1
        prevState.current = 'Done'
        return prevState
      })
    }
  }

  buildString = remaining => {
    let current = ''
    this.loopBuild(current, remaining).then(
      ({ current, char, remaining: newRemaining }) => {
        this.setState(({ decode, string }) => {
          decode.pop()
          decode.push({
            code: current,
            char,
          })
          string = `${string}${char}`

          return { decode, string }
        })
        if (newRemaining.length > 0) {
          this.buildString(newRemaining)
        } else {
          this.setState(prevState => {
            prevState.time += 1
            prevState.current = 'Done'
            return prevState
          })
        }
      }
    )
  }

  loopBuild(current, remaining) {
    return new Promise(resolve => {
      current = `${current}${remaining.substring(0, 1)}`
      this.setState(({ decode, time }) => {
        if (decode[decode.length - 1] && !decode[decode.length - 1].char) {
          decode.pop()
        }
        decode.push({
          code: current,
        })
        time += 1
        return { decode, time }
      })
      remaining = remaining.slice(1)
      const char = this.props.encode.map[current]
      if (char) {
        setTimeout(() => {
          resolve({ current, char, remaining })
        }, this.props.delay)
      } else {
        setTimeout(() => {
          resolve(this.loopBuild(current, remaining))
        }, this.props.delay)
      }
    })
  }

  render() {
    const { type, encode, delay } = this.props
    const { decode, time, string } = this.state
    return (
      <div className="container">
        <h3 style={{ textAlign: 'center' }}>{type}</h3>
        <div className="column">
          <h5>Binary: {encode.string}</h5>
          <h5>Space: {encode.string.length} bits</h5>
          <h5>Decode Time: {Math.round(time * delay * 1000) / 1000000} seconds</h5>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Char</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(encode.map).map((item, i) => {
                if (typeof encode.map[item] === 'undefined' || item === '') {
                  return null
                }
                return (
                  <tr key={i}>
                    <td>
                      <code>{item}</code>
                    </td>
                    <td>
                      <code> '{encode.map[item]}' </code>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="column">
          {string.length === 0 ? (
            <span style={{ fontStyle: 'italic', color: '#999' }}>No Data</span>
          ) : (
            <span>{string}</span>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {decode.map((element, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: element.char ? '#ccc' : '#f4eb42',
                  border: '1px solid #222',
                  margin: '3px',
                  padding: '0 3px',
                  textAlign: 'center'
                }}
              >
                <div>
                  {element.code}
                </div>
                <div>{element.char || ' '}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Encoding
