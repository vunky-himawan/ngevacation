type Validation = {
  validateTitle: (title: string) => string;
  validateContent: (content: string) => string;
  validateCover: (cover: string) => string;
};

export const UseValidationArticle = (): Validation => {
  return {
    validateCover: (cover: string) => {
      if (!cover) {
        return "Cover is required";
      }
      return "";
    },
    validateTitle: (title: string) => {
      if (title.length < 3) {
        return "Title should be more than 3 characters";
      }
      if (title.length > 255) {
        return "Title should be less than 255 characters";
      }
      return "";
    },
    validateContent: (content: string) => {
      if (content.length < 10) {
        return "Content should be more than 10 characters";
      }
      return "";
    },
  };
};
