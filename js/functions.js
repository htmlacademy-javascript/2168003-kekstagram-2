function isShorterThan (string, assumedLength) {
  return string.length <= assumedLength;
}

function isPalindrome (string) {
  const adaptedString = string.toLowerCase().replaceAll(' ', '');

  for (let i = 0; i < adaptedString.length / 2; i++) {
    if (adaptedString[i] !== adaptedString[adaptedString.length - i - 1]) return false;
  }

  return true;
}

function parseNumbers (string) {
  const onlyNumbers = string.replaceAll(/[^0-9]/g, '');
  return onlyNumbers.length == 0 ? NaN : Number(onlyNumbers);
}
