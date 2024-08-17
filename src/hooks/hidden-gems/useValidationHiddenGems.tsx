import { HiddenGemsCategory } from "@/types/HiddenGemsCategory";

type Day = {
  index: number;
  name: string;
};

type OperationalDay = {
  day: Day;
  openingTime: Date;
  closingTime: Date;
};

const useValidationHiddenGems = () => {
  const validateCover = (cover: string) => {
    if (cover === "") {
      return "Cover is required";
    }
    return "";
  };

  const validateTitle = (title: string) => {
    if (title.trim() === "") {
      return "Title is required";
    }

    if (title.length < 5) {
      return "Title should be at least 5 characters";
    }

    return "";
  };

  const validateDescription = (description: string) => {
    if (description.length < 10) {
      return "Description should be at least 10 characters";
    }
    return "";
  };

  const validateAddress = (address: string) => {
    if (address.length < 5) {
      return "Address should be at least 5 characters";
    }
    return "";
  };

  const validatePrize = (lowestPrice: number, highestPrice: number) => {
    if (lowestPrice < 0 || highestPrice < 0) {
      return "Prize should be greater than 0";
    }
    if (lowestPrice > highestPrice) {
      return "Lowest Price should be less than Highest Price";
    }
    if (highestPrice < lowestPrice) {
      return "Highest Price should be greater than Lowest Price";
    }

    return "";
  };

  const validateCategory = (category_name: string | undefined) => {
    if (category_name === undefined) {
      return "Category is required";
    }
    return "";
  };

  const validateOperationalDays = (operationalDays: OperationalDay[]) => {
    if (operationalDays.length === 0) {
      return "Operational Days is required";
    }

    return "";
  };

  const validateOperationalDay = (operationalDay: OperationalDay) => {
    if (operationalDay.day === undefined) {
      return `Day is required at day`;
    }

    if (operationalDay.openingTime === undefined) {
      return `Opening Time is required at day`;
    }

    if (operationalDay.closingTime === undefined) {
      return `Closing Time is required at day`;
    }

    if (operationalDay.openingTime > operationalDay.closingTime) {
      return `Opening Time should be less than Closing Time at day`;
    }

    if (operationalDay.closingTime < operationalDay.openingTime) {
      return `Closing Time should be greater than Opening Time at day`;
    }

    return "";
  };

  return {
    validateCover,
    validateTitle,
    validateDescription,
    validateAddress,
    validatePrize,
    validateOperationalDays,
    validateOperationalDay,
    validateCategory,
  };
};

export default useValidationHiddenGems;
