import { capitalizeFirstLetterOfWord } from "./capitalizeFirstLetterOfWord";

export const eachWordFirstLetterToUpperCase = (sentence, separator = " ") => {
  const sentenceWordsArr = sentence.split(separator);

  const convertedWords = sentenceWordsArr.map((word) =>
    capitalizeFirstLetterOfWord(word)
  );

  return convertedWords.join(" ");
};
