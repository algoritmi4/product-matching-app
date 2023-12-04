import { IDealer } from './Interfaces/IDealer.interface';
import { IDealerProduct } from './Interfaces/IDealerProduct.interface';
import { IProduct } from './Interfaces/IProduct.interface';
import { IUser } from './Interfaces/IUser.interface';

export const API_URL = 'http://localhost:8001';
export const HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
export const HEADER_AUTH = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
};

export const INITIAL_MARKETING_DEALER: IDealer[] = [
  {
    id: 0,
    name: 'Список диллеров не загружен'
  }
];

export const INITIAL_MARKETING_DEALERPRICE: IDealerProduct[] = [
  {
    id: 0,
    product_key: '',
    price: 0,
    product_url: '',
    product_name: '',
    date: '',
    dealer: { name: '', id: 0 },
    mapped: null
  }
];

export const INIRIAL_MARKETING_PRODUCTS: IProduct[] = [
  {
    FIELD1: 0,
    id: 0,
    article: '',
    ean_13: 0,
    name: '',
    cost: 0,
    recommended_price: 0,
    category_id: null,
    ozon_name: '',
    name_1c: '',
    wb_name: '',
    ozon_article: null,
    wb_article: null,
    ym_article: '',
    wb_article_td: ''
  }
];

export const INIRIAL_USER: IUser = {
  id: 0,
  email: '',
  is_active: true,
  is_superuser: false,
  is_verified: false,
  username: ''
};

export const REQUIRED_ERROR_MESSAGE = 'Поле не может быть пустым.';

export const NAME_REGEXP = /^[a-zA-Zа-яА-Я-\s]*$/;
export const NAME_VALIDATION_ERROR_MESSAGE =
  'В имени допускается использовать только буквы, тире и пробел.';

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const WRONG_EMAIL_MESSAGE = 'Введено не корректное значение E-mail.';

export const PASSWORD_REGEXP = /^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*)(?=.*[a-z].*).*$/;
export const PASSWORD_HINT =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_VALIDATION_ERROR_MESSAGE =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 8 символов.';

export const NAME_MIN_LENGTH = 2;
export const NAME_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 2 символов.';

export const NAME_MAX_LENGTH = 30;
export const NAME_MAX_LENGTH_ERROR_MESSAGE = 'Длинна должна до 30 символов.';
