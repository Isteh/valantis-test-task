import { IProduct } from '../Interfaces/product';
import { API_URL } from '../consts';
import { getApiAccesKey } from './getApiAccesKey';

type TypeFetchProductsData = (
  productIds: Array<string>,
  errorCallback?: ErrorCallback
) => Promise<Array<IProduct>>;

export const fetchProductsData: TypeFetchProductsData =
  (productIds, errorCallback) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': getApiAccesKey(),
      },
      body: JSON.stringify({
        action: 'get_items',
        params: { ids: productIds },
      }),
    })
      .then((res) => res.json())
      .then((res) => res.result)
      .catch((e) => {
        console.log(e.status);
        errorCallback && errorCallback(e);
      });
  };
