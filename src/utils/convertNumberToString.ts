const convertNumberToString = (paymentNumber: number) => {
  const objectStrings: Array<string> = [
    'Один',
    'Два',
    'Три',
    'Четыре',
    'Пять',
    'Шесть',
    'Семь',
    'Восемь',
    'Девять',
    'Десять',
    'Одиннадцать',
    'Двенадцать',
  ];

  return paymentNumber && objectStrings[paymentNumber - 1];
};

export default convertNumberToString;
