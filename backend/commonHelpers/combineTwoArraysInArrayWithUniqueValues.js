export function combineUniqueArrays(arr1, arr2) {
  const combinedArray = [...arr1, ...arr2];

  const uniqueValues = new Set(combinedArray);

  return Array.from(uniqueValues);
}