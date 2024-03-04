import { IFilters } from '../Interfaces/filters';
import { API_URL } from '../consts';
import { getApiAccesKey } from './getApiAccesKey';
import { getFiltersParams } from './getFiltersParams';

type TypeGetProductsIds = (
  filters: IFilters,
  onSucces: (data: Array<string>) => void,
  onError?: (e: Error) => void
) => Promise<void>;

export const getProductsIds: TypeGetProductsIds =
  (filters, onSucces, onError) => {
    let fetchBody: {
      action: string;
      params?: Record<string, string>;
    } = {
      action: 'get_ids',
    };
    if (
      filters.brandFilter ||
      filters.productFilter ||
      filters.priceFilter
    ) {
      fetchBody = {
        action: 'filter',
        params: getFiltersParams(filters),
      };
    }
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': getApiAccesKey(),
      },
      body: JSON.stringify(fetchBody),
    })
      .then((res) => res.json())
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
        console.log(e);
        onError && onError(e);
      });
  };
