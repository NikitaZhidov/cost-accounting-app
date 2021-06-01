import { getCorrectDateString } from "../../utils/dateUtils";

export const getUserLastCosts = (costs, userId = null) => {
  if (!userId) {
    let allCosts = [];

    costs.users.forEach((u) => {
      allCosts.concat(u.costs.costs);
      const userCosts = u.costs.costs.map((c) => ({
        ...c,
        userId: u._id,
        userName: u.name,
      }));
      allCosts = [...allCosts, ...userCosts];
    });

    if (allCosts.length > 0) {
      return helperGetLastCosts(allCosts, "all");
    }

    return { all: null };
  } else {
    let userCosts = costs.users.find((u) => u._id === userId);
    if (!userCosts) return { userId: null };
    userCosts.costs.costs = userCosts?.costs?.costs?.map?.((c) => ({
      ...c,
      userName: userCosts.name,
      userId: userCosts._id,
    }));

    return helperGetLastCosts(userCosts.costs.costs, userId);
  }
};

const helperGetLastCosts = (costsToSend, value) => {
  if (!costsToSend[0]) {
    return {
      [value]: null,
    };
  }

  costsToSend.sort((c1, c2) => new Date(c2.date) - new Date(c1.date));

  let lastDate = costsToSend[0].date;
  let lastDateArray = costsToSend.filter((c) => c.date === lastDate);

  const lastDateString = getCorrectDateString(lastDate);

  let prevLastCost = costsToSend.find((c) => c.date !== lastDate);

  if (!prevLastCost) {
    return {
      [value]: {
        lastDate: { lastDate: lastDateString, array: lastDateArray },
        prevLastDate: null,
      },
    };
  }

  let prevLastDate = prevLastCost.date;
  let prevLastDateArray = costsToSend.filter((c) => c.date === prevLastDate);

  const prevLastDateString = getCorrectDateString(prevLastDate);

  return {
    [value]: {
      lastDate: { lastDate: lastDateString, array: lastDateArray },
      prevLastDate: {
        prevLastDate: prevLastDateString,
        array: prevLastDateArray,
      },
    },
  };
};
