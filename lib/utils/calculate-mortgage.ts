export function calculateMortgage(
  principal: number,
  interestRate: number,
  loanTerm: number,
  paymentFrequency: 'monthly' | 'biweekly'
): {
  payment: number;
  totalInterest: number;
  totalPayment: number;
} {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = paymentFrequency === 'monthly' ? loanTerm * 12 : loanTerm * 26;
  const paymentFactor = paymentFrequency === 'monthly' ? 1 : 14 / 30;

  const payment =
    ((principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) *
    paymentFactor;

  const totalPayment = payment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    payment,
    totalInterest,
    totalPayment,
  };
}
