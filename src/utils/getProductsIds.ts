import { fetchProductsIds } from './fetchProductsIds';

export type TypeFilters = {
  brandFilter?: string;
  priceFilter?: number;
  productFilter?: string;
};

type TypeGetProductsIds = (
  filters: TypeFilters,
  onSucces: (data: Array<string>) => void
) => Promise<void>;

export const getProductsIds: TypeGetProductsIds =
  (filters, onSucces) => {
    return fetchProductsIds(filters, (e) =>
      fetchProductsIds(filters)
    )
      .then((res) =>
        res.filter((element, index, array) =>
          array.indexOf(element) === index
            ? true
            : false
        )
      )
      .then((res) => onSucces(res))
      .catch((e) => console.log(e));
  };
