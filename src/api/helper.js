const getKey = (obj, value) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) return prop
    }
  }
}

export const encode = (string, encodes) => {
  let result = ''
  for (let i = 0; i < string.length; i += 1) {
    const key = getKey(encodes, string[i]);
    result = `${result}${key}`;
  }
  return result
}
