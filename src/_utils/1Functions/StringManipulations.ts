function getStringBetweenPercentSigns(inputString: string) {
  const regex = /%([^%]*)%/; // Matches a substring between two '%' symbols
  const match = inputString.match(regex)!;

  return match[1];
}

export { getStringBetweenPercentSigns };