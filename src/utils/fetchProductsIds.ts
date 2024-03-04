import { API_URL } from '../consts';
import { getApiAccesKey } from './getApiAccesKey';
import { TypeFilters } from './getProductsIds';

type TypeFetchProductsIds = (
  filters: TypeFilters,
  errorCallback?: ErrorCallback
) => Promise<Array<string>>;

export const fetchProductsIds: TypeFetchProductsIds =
  (
    { brandFilter, productFilter, priceFilter },
    errorCallback
  ) => {
    if (
      brandFilter ||
      productFilter ||
      priceFilter
    ) {
      let filtersParams = {};
      if (brandFilter)
        filtersParams = {
          ...filtersParams,
          brand: brandFilter,
        };
      if (priceFilter)
        filtersParams = {
          ...filtersParams,
          price: priceFilter,
        };
      if (productFilter)
        filtersParams = {
          ...filtersParams,
          product: productFilter,
        };

      return fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': getApiAccesKey(),
        },
        body: JSON.stringify({
          action: 'filter',
          params: { ...filtersParams },
        }),
      })
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => {
          console.log(e.status);
          errorCallback && errorCallback(e);
        });
    } else {
      return fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': getApiAccesKey(),
        },
        body: JSON.stringify({
          action: 'get_ids',
        }),
      })
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => {
          console.log(e.status);
          errorCallback && errorCallback(e);
        });
    }
  };
