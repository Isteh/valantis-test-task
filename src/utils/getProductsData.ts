import { IProduct } from '../Interfaces/product';
import { API_URL } from '../consts';
import { getApiAccesKey } from './getApiAccesKey';

type TypeGetProductsData = (
  productIds: Array<string>,
  onSucces: (data: Array<IProduct>) => void,
  onError?: (e: Error) => void
) => Promise<void>;

export const getProductsData: TypeGetProductsData =
  (productIds, onSucces, onError) => {
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
      .then<Array<IProduct>>((res) => res.result)
      .then((res) =>
        res.filter((product, index, array) => {
          const indexCopy = array
            .slice(index + 1)
            .findIndex(
              (element) =>
                element.id === product.id
            );
          if (indexCopy === -1) return true;
          return false;
        })
      )
      .then((res) => onSucces(res))
      .catch((e) => {
        console.log(e.status);
        onError && onError(e);
      });
  };
