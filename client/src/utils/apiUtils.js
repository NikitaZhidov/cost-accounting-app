import { getFormattedDateString } from "./dateUtils";

export const getCostsQueryParams = (from, to, userId, count, page) => {
  let queryParams = [];
  const fromQuery = getFormattedDateString(from);
  const toQuery = getFormattedDateString(to);

  if (from !== null) queryParams.push(`from=${fromQuery}`);
  if (to !== null) queryParams.push(`to=${toQuery}`);
  if (userId !== null) queryParams.push(`userId=${userId}`);
  if (count !== null) queryParams.push(`count=${count}`);
  if (page !== null) queryParams.push(`page=${page}`);

  return queryParams.join("&");
};
