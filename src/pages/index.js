import React, { Component } from 'react'

import { Fixed, Tree } from '../api'
import Layout from '../components/layout'
import Input from '../components/Input'
import Encoding from '../components/Encoding'

const defaultState = { tree: undefined, fixed: undefined, delay: 0 }

class IndexPage extends Component {
  state = defaultState;

  encode = string => {
    const tree = new Tree(string)
    const fixed = new Fixed(string)
    // const delay =  1000 / Math.max(tree.encoded.string.length, fixed.encoded.string.length);
    this.setState({
      tree,
      fixed,
      delay: 100,
    })
  }

  reset = () => {
    this.setState(defaultState)
  }

  render() {
    const { tree, fixed, delay } = this.state
    console.log(delay);
    return (
      <Layout>
        <Input encode={this.encode} reset={this.reset} />
        {delay > 0 && <h3 style={{ textAlign: 'center'}}>Lets say it takes {Math.round(delay * 1000) / 1000}ms to decode each bit</h3>}
        <div className="container">
          <div className="column">
            {tree && <Encoding type="Huffman" encode={tree.encoded} delay={delay} />}
          </div>
          <div className="column">
            {fixed && <Encoding type="Fixed" encode={fixed.encoded} delay={delay} />}
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
