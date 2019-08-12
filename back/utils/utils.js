const makeKey = (year = 1970, month = 1, day = null, hour = null) => {
  let key = '';

  year = parseInt(year, 10);
  month = parseInt(month, 10);

  if (isNaN(year)) {
    throw "Year is not number.";
  }

  if (isNaN(month)) {
    throw "Month is not number.";
  }

  if(day !== null) {
    day = parseInt(day, 10);
    if (isNaN(day)) {
      throw "Day is not number.";
    }
  }

  if(hour !== null) {
    hour = parseInt(hour, 10);
    if(isNaN(hour)) {
      throw "Hour is not number.";
    }
  }

  if (year >= 1970) {
    key += year.toString();
  } else {
    throw "Year is out of range.";
  }

  if (month >= 1 && month <= 12) {
    key += month.toString().padStart(2, '0');
  } else {
    throw "Month is out of range.";
  }

  if (day !== null && day >= 0 && day <= 31) {
    key += day.toString().padStart(2, "0");
  } else if (day !== null) {
    throw "Day is out of range.";
  }

  if (hour !== null && hour >= 0 && hour <= 24) {
    key += '_' + hour.toString().padStart(2, "0");
  } else if (hour !== null) {
    throw "Hour is out of range.";
  }

  return key;
};

module.exports = {
  makeKey: makeKey
};