
export const validationData = (data?: string | object): boolean => {

  if (data === undefined || data === null) {

    return true;
  }
  return false;
}

export const validationPattern = (pattern: RegExp, checkingString: string): boolean => {

  if (pattern.test(checkingString)) {

    return false;
  }
  return true;
}