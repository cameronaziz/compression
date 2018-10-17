import Node from './node';
import { encode } from './helper';

class Tree {
  constructor(string) {
    this.frequencies = [];
    this.encodes = {};
    this.buildFrequencies(string);
    this.buildTree();
    this.buildMap(this.root, '');
    this.encoded = {
      string: encode(string, this.encodes),
      map: this.encodes,
    };
  }

  buildFrequencies(string) {
    this.frequencies.push({
      frequency: Number.MAX_SAFE_INTEGER
    });
    const chars = {};
    for (let i = 0; i < string.length; i += 1) {
      chars[string[i]] = (chars[string[i]] || 0) + 1;
    }
    for (let char in chars) {
      const datum = {
        frequency: chars[char],
        value: char
      };
      for (let k = 0 ; k < this.frequencies.length; k += 1) {
        if (this.frequencies[k].frequency >= chars[char]){
          this.frequencies.splice(k, 0, datum);
          break;
        }
      }
    }
    this.frequencies.pop();
    this.frequencies.reverse();
  }

  buildTree() {
    while(this.frequencies.length > 2) {
      const lowest = this.frequencies.pop();
      const secondLowest = this.frequencies.pop();
      const right = new Node(lowest);
      const left = new Node(secondLowest);
      const parent = new Node({ right, left });
      for (let i = 0; i < this.frequencies.length; i += 1) {
        if(parent.frequency >= this.frequencies[i].frequency) {
          this.frequencies.splice(i, 0, parent);
          break;
        }
      }
    }
    this.root = new Node({ right: this.frequencies[0], left: this.frequencies[1]});
  }

  buildMap(root, address) {
    if (root.left) {
      this.buildMap(root.left, `${address}0`);
    }
    if (root.right) {
      this.buildMap(root.right, `${address}1`)
    }
    if (root.value) {
      this.encodes[address] = root.value;
    }
  }
}


export default Tree;