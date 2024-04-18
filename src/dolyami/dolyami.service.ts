import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Redirect } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { catchError, firstValueFrom, map } from 'rxjs';
import configHeadersDolyami from 'src/utils/configHeadersDolyami';

@Injectable()
export class DolyamiService {
  constructor(private readonly httpService: HttpService) {}

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
}
