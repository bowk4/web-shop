const exceptionsArr = ["iphone", "ipad"];

export const capitalizeFirstLetterOfWord = (word) => {
  const lowercaseWord = word.toLowerCase();
  const isOneOfExceptions = exceptionsArr.includes(lowercaseWord);
  if (isOneOfExceptions) {
    return (
      lowercaseWord.charAt(0) +
      lowercaseWord.charAt(1).toUpperCase() +
      lowercaseWord.slice(2)
    );
  }
  return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
};
