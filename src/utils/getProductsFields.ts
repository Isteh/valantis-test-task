import { API_URL } from '../consts';
import { getApiAccesKey } from './getApiAccesKey';

type TypeGetProductsFields = (
  field: 'brand' | 'price',
  onSucces: (
    data: Array<string | number>
  ) => void,
  onError?: (e: Error) => void
) => Promise<void>;

export const getProductsFields: TypeGetProductsFields =
  (field, onSucces, onError) => {
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
      .then((res) =>
        res.filter(
          (
            element: string | number,
            index: number,
            array: Array<string | number>
          ) => {
            if (element === null) return false;
            if (array.indexOf(element) === index)
              return true;
            return false;
          }
        )
      )
      .then((res) => onSucces(res))
      .catch((e) => {
        console.log(e.status);
        onError && onError(e);
      });
  };
