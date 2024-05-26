import convertNumberToSequenceString from './convertNumberToSequenceString';
import convertNumberToString from './convertNumberToString';

type TCompletedApplication = {
  id: string;
  status: string;
  amount: number;
  residual_amount: number;
  demo: boolean;
  client_info: {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone: string;
    birthdate: string;
  };
  payment_schedule: Array<{
    payment_date: string;
    amount: number;
    status: string;
  }>;
};

const getInfoFromJsonWebhook = (data: TCompletedApplication) => {
  const clientFullName =
    data.client_info.last_name +
    ' ' +
    data.client_info.first_name +
    ' ' +
    data.client_info.middle_name;

  const phone = data.client_info.phone;
  const email = data.client_info.email;

  const numberOfPayments = data.payment_schedule.length;
  const totalPrice = data.amount;
  const residualPrice = data.residual_amount;

  let paidPaymentNumber = 0;
  let scheduledPaymentNumber = 0;
  let amount = 0;
  let paymentDate = '';

  data.payment_schedule.forEach((element) => {
    if (element.status === 'paid') {
      paidPaymentNumber++;
      amount = element.amount;
      paymentDate = element.payment_date;
    } else if (element.status === 'scheduled') {
      scheduledPaymentNumber++;
    }
  });

  const stringPaidPaymentNumber =
    convertNumberToSequenceString(paidPaymentNumber);
  const stringScheduledPaymentNumber = convertNumberToString(
    scheduledPaymentNumber,
  );

  return [
    clientFullName,
    numberOfPayments,
    totalPrice,
    residualPrice,
    paidPaymentNumber,
    scheduledPaymentNumber,
    amount,
    stringPaidPaymentNumber,
    stringScheduledPaymentNumber,
    phone,
    email,
    paymentDate,
  ];
};

export default getInfoFromJsonWebhook;
