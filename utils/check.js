function isValidPageAndCount(page, count) {
  if (count) {
    if (isNaN(+count) || +count < 0) {
      return false;
    }
  }

  if (page) {
    if (isNaN(+page) || +page < 1) {
      return false;
    }
  }

  return true;
}

module.exports = {
  isValidPageAndCount,
};
