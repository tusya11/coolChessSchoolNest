export class OrderDTO {
  order: {
    id: string;
    amount: number;
    items: [
      {
        name: string;
        quantity: number;
        price: number;
      },
    ];
  };
}
