import moment from 'moment/moment';

export const calculateExpirationDate = (durationDays: number): string => {
  const expirationDate = moment(new Date()).add(durationDays, 'days');
  return expirationDate.format('DD.MM.YY');
};

export const calculateExpirationDateForDB = (durationDays: number): Date => {
  const expirationDate = moment(new Date()).add(durationDays, 'days');
  return expirationDate.toDate();
};
