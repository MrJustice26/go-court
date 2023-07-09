export const removeQuotes = (str: string): string => {
  return str.replace(/['"]+/g, '');
};
