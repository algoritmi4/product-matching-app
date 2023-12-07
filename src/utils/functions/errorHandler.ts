import { HTTP_REQUEST_ERROR_MESSAGE_LIST } from '../constants';

export function errorHandler(result: Response) {
  const status = result.status.toString();
  if (status in HTTP_REQUEST_ERROR_MESSAGE_LIST) {
    console.log('status =>', status, HTTP_REQUEST_ERROR_MESSAGE_LIST[status]);

    return HTTP_REQUEST_ERROR_MESSAGE_LIST[status];
  }

  return {
    code: result.status,
    message: `Ошибка при запросе: ${status}`
  };
}
