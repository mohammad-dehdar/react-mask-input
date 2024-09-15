
const isEnglish = (text) => /^[A-Za-z\s]*$/.test(text);

const validateInput = (value) => {
  if (!isEnglish(value)) {
    return "Please type in English only.";
  }
  return "";
};

export {validateInput}