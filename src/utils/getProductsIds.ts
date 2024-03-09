import { IFilters } from '../Interfaces/filters';
import { API_URL } from '../consts';
import { NetworkError } from '../errors/networkError';
import { getApiAccesKey } from './getApiAccesKey';
import { getFiltersParams } from './getFiltersParams';

type TypeGetProductsIds = (
  onSucces: (data: Array<string>) => void,
  filters: IFilters | null,
  onError?: (e: Error) => void
) => void;

export const getProductsIds: TypeGetProductsIds =
  (onSucces, filters, onError) => {
    // счетчик вызовов, чтобы при ошибке сети вызвать рефетч только 1 раз
    let countOfCall = 0;

    let fetchBody: {
      action: string;
      params?: Record<string, string>;
    } = {
      action: 'get_ids',
    };
    if (
      filters &&
      (filters.brandFilter ||
        filters.productFilter ||
        filters.priceFilter)
    ) {
      fetchBody = {
        action: 'filter',
        params: getFiltersParams(filters),
      };
    }
    // возвращаем IIFE function definiton, чтобы можно ссылаться внутри нее на нее же
    return (function fetchIds() {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': getApiAccesKey(),
        },
        body: JSON.stringify(fetchBody),
      })
        .then((res) => {
          // если ошибка сети - выводим в обработчик
          if (!res.ok)
            throw new NetworkError(
              res.status.toString()
            );
          return res.json();
        })
        .then<Array<string>>((res) => res.result)
        .then((res) =>
          res.filter((element, index, array) =>
            array.indexOf(element) === index
              ? true
              : false
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
            fetchIds();
          } else onError && onError(e);
        });
    })();
  };
