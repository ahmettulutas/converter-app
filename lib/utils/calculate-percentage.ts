export const calculatePercentage = (value: number, total: number): number => {
  return (value / total) * 100;
};

export const calculateValueFromPercentage = (percentage: number, total: number): number => {
  return (percentage / 100) * total;
};

export const calculateTotalFromPercentage = (value: number, percentage: number): number => {
  return value / (percentage / 100);
};

export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  return ((newValue - oldValue) / oldValue) * 100;
};

export const increaseByPercentage = (value: number, percentage: number): number => {
  return value * (1 + percentage / 100);
};

export const decreaseByPercentage = (value: number, percentage: number): number => {
  return value * (1 - percentage / 100);
};
