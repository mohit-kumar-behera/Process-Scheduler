const sortify = (arr, ...sortBy) => {
  if (!(arr instanceof Array)) return console.log('Not an instance of Array');

  const func = (a, b, [...sortBy]) => {
    let flag = 1; // Sort in ascending order
    let sortByField = sortBy.shift();

    if (!sortByField) return 0;

    if (sortByField.startsWith('-')) {
      // Sort that field in descending order
      flag = -1;
      sortByField = sortByField.slice(1);
    }

    if (a[sortByField] > b[sortByField]) return flag;
    else if (a[sortByField] < b[sortByField]) return -flag;

    return func(a, b, sortBy);
  };

  arr.sort((a, b) => func(a, b, sortBy));
};

module.exports = sortify;
