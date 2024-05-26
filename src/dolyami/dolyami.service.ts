import './test.json';
import configHeadersDolyami from 'src/utils/configHeadersDolyami';
import getInfoFromJsonWebhook from 'src/utils/getInfoFromJsonWebhook';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class DolyamiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mailerService: MailerService,
  ) {}

  async createOrder(data) {
    const uuid = randomUUID();
    const config = {
      ...configHeadersDolyami,
      headers: {
        ...configHeadersDolyami.headers,
        'X-Correlation-ID': uuid,
      },
    };

    const responseData = await firstValueFrom(
      this.httpService
        .post('https://partner.dolyame.ru/v1/orders/create', data, config)
        .pipe(
          map((response) => {
            const resultData = {
              ...response.data,
              uuid: uuid,
              orderId: data.order.id,
            };
            return resultData;
          }),
          catchError((error) => {
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
    );

    return responseData;
  }

  async getInfoOrder(param) {
    const uuid = randomUUID();
    const config = {
      ...configHeadersDolyami,
      headers: {
        ...configHeadersDolyami.headers,
        'X-Correlation-ID': uuid,
      },
    };

    const responseData = await firstValueFrom(
      this.httpService
        .get(`https://partner.dolyame.ru/v1/orders/${param.id}/info`, config)
        .pipe(
          map((response) => {
            const resultData = {
              ...response.data,
              uuid: uuid,
            };
            return resultData;
          }),
          catchError((error) => {
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
    );

    return responseData;
  }

  async sendEmail(data) {
    const [
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
    ] = getInfoFromJsonWebhook(data);

    this.mailerService
      .sendMail({
        to: 'micke.brown@yandex.ru',
        from: 'coolchess_online@mail.ru',
        subject: `Информация о платеже сервиса "Долями" - ${clientFullName}`,
        template: 'message',
        context: {
          clientFullName,
          numberOfPayments,
          totalPrice,
          residualPrice,
          paidPaymentNumber,
          scheduledPaymentNumber,
          amount,
          stringPaidPaymentNumber: stringPaidPaymentNumber
            .toString()
            .toLowerCase(),
          stringScheduledPaymentNumber: stringScheduledPaymentNumber
            .toString()
            .toLowerCase(),
          phone,
          email,
          paymentDate,
        },
      })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  }
}
