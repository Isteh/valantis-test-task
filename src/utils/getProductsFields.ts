import { API_URL } from '../consts';
import { NetworkError } from '../errors/networkError';
import { getApiAccesKey } from './getApiAccesKey';

type TypeGetProductsFields = (
  field: 'brand' | 'price',
  onSucces: (
    data: Array<string | number>
  ) => void,
  onError?: (e: Error) => void
) => void;

export const getProductsFields: TypeGetProductsFields =
  (field, onSucces, onError) => {
    // счетчик вызовов, чтобы при ошибке сети вызвать рефетч только 1 раз
    let countOfCall = 0;
    // возвращаем IIFE function definiton, чтобы можно ссылаться внутри нее на нее же
    return (function fetchFields() {
      fetch(API_URL, {
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
        .then((res) => {
          // если ошибка сети - выводим в обработчик
          if (!res.ok)
            throw new NetworkError(
              res.status.toString()
            );
          return res.json();
        })
        .then((res) => res.result)
        .then((res) =>
          res.filter(
            (
              element: string | number,
              index: number,
              array: Array<string | number>
            ) => {
              if (element === null) return false;
              if (
                array.indexOf(element) === index
              )
                return true;
              return false;
            }
          )
        )
        .then((res) => onSucces(res))
        .catch((e) => {
          // При ошибке сети делаем рефетч в первый раз
          if (
            e.name === 'NetworkError' &&
            countOfCall < 1
          ) {
            console.error(e);
            countOfCall++;
            fetchFields();
          } else onError && onError(e);
        });
    })();
  };
