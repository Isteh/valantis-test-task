import { IProduct } from '../Interfaces/product';
import { API_URL } from '../consts';
import { NetworkError } from '../errors/networkError';
import { getApiAccesKey } from './getApiAccesKey';

type TypeGetProductsData = (
  productIds: Array<string>,
  onSucces: (data: Array<IProduct>) => void,
  onError?: (e: Error) => void
) => void;

export const getProductsData: TypeGetProductsData =
  (productIds, onSucces, onError) => {
    // счетчик вызовов, чтобы при ошибке сети вызвать рефетч только 1 раз
    let countOfCall = 0;
    // возвращаем IIFE function definiton, чтобы можно ссылаться внутри нее на нее же
    return (function fetchData() {
      fetch(API_URL, {
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
        .then((res) => {
          // если ошибка сети - выводим в обработчик
          if (!res.ok)
            throw new NetworkError(
              res.status.toString()
            );
          return res.json();
        })
        .then<Array<IProduct>>(
          (res) => res.result
        )
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
          // При ошибке сети делаем рефетч в первый раз
          if (
            e.name === 'NetworkError' &&
            countOfCall < 1
          ) {
            console.error(e);
            countOfCall++;
            fetchData();
          } else onError && onError(e);
        });
    })();
  };
