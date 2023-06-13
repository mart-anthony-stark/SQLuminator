/**
 * Condition builder for filtering
 * @param where - Condition
 */
export const buildConditions = (where: Object): string => {
  let conditions = "";
  const conditionKeys = Object.keys(where);
  const conditionValues = Object.values(where).map((value) =>
    typeof value === "string" ? `'${value}'` : value
  );

  conditionKeys.forEach((key, index) => {
    conditions += `${key} = ?
                    ${index === conditionKeys.length - 1 ? "" : " AND "}`;
  });
  return conditions;
};

export const pluralize = (word: string): string => {
  if (word.endsWith("y")) {
    // Replace 'y' with 'ies' for words ending in 'y'
    return word.slice(0, -1) + "ies"; // Plural form
  } else {
    // Simple pluralization rule (adding 's' at the end)
    return word + "s"; // Plural form
  }
};
