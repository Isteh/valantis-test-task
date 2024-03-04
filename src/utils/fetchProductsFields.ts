import { getApiAccesKey } from './getApiAccesKey';

type TypeFetchProductsFields = (
  field: 'brand' | 'price',
  errorCallback?: ErrorCallback
) => Promise<Array<string | number>>;

const API_URL =
  'http://api.valantis.store:40000/';

export const fetchProductsFields: TypeFetchProductsFields =
  (field, errorCallback) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': getApiAccesKey(),
      },
      body: JSON.stringify({
        action: 'get_fields',
        params: { field: field },
      }),
    })
      .then((res) => res.json())
      .then((res) => res.result)
      .catch((e) => {
        console.log(e.status);
        errorCallback && errorCallback(e);
      });
  };