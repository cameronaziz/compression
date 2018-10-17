import { encode } from './helper';

class Fixed {
  constructor(string) {
    this.encodes = {};
    this.length = 1;
    const chars = this.getStats(string);
    this.buildEncodes(chars);
    this.encoded = {
      string: encode(string, this.encodes),
      map: this.encodes,
      length: this.length,
    };
  }

  getStats(string) {
    const chars = []
    for (let i = 0; i < string.length; i += 1) {
      if (chars.indexOf(string[i]) < 0) {
        chars.push(string[i])
      }
    }
    while (Math.pow(2, this.length) < chars.length) {
      this.length += 1
    }
    return chars;
  }

  buildEncodes(chars) {
    const binaries = this.createBinary(this.length);
    while(binaries.length) {
      const code = binaries.pop();
      const char = chars.pop();
      this.encodes[code] = char;
    }
  }

  createBinary(n) {
    var states = []
    var maxDecimal = parseInt('1'.repeat(n), 2)
    for (var i = 0; i <= maxDecimal; i += 1) {
      states.push(i.toString(2).padStart(n, '0'))
    }
    return states
  }
}

export default Fixed
