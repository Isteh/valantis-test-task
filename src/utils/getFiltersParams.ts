import { IFilters } from '../Interfaces/filters';

export const getFiltersParams = ({
  brandFilter,
  productFilter,
  priceFilter,
}: IFilters) => {
  let filtersParams = {};
  if (brandFilter)
    filtersParams = {
      brand: brandFilter,
    };
  if (priceFilter)
    filtersParams = {
      price: priceFilter,
    };
  if (productFilter)
    filtersParams = {
      product: productFilter,
    };
  return filtersParams;
};
