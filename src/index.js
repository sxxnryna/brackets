module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let openBrackets = {};
  let closeBrackets = {};
  let sameBrackets = {};

  for (let [open, close] of bracketsConfig) {
    if (open === close) {
      sameBrackets[open] = true;
    } else {
      openBrackets[open] = close;
      closeBrackets[close] = open;
    }
  }

  for (let char of str) {
    if (sameBrackets[char]) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openBrackets[char]) {
      stack.push(char);
    } else if (closeBrackets[char]) {
      if (stack.length === 0 || stack.pop() !== closeBrackets[char]) {
        return false; // Mismatch found
      }
    }
  }

  return stack.length === 0;
};
