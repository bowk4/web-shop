import adminOptions from "./adminOptions";

export const findComponentByTitleAndLabel = (optionTitle, optionLabel) => {
  const option = adminOptions.find((opt) => opt.title === optionTitle);
  if (option) {
    const subOption = option.subOptions.find(
      (subOpt) => subOpt.label === optionLabel
    );

    if (subOption) {
      return subOption.component;
    }
  }

  return null;
};
