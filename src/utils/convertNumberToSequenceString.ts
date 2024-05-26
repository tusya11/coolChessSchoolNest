const convertNumberToSequenceString = (paidPaymentNumber: number) => {
  const objectSequenceStrings: Array<string> = [
    'Первый',
    'Второй',
    'Третий',
    'Четвертый',
    'Пятый',
    'Шестой',
    'Седьмой',
    'Восьмой',
    'Девятый',
    'Десятый',
    'Одиннадцатый',
    'Двенадцатый',
  ];

  return paidPaymentNumber && objectSequenceStrings[paidPaymentNumber - 1];
};

export default convertNumberToSequenceString;
