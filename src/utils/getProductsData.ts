import { IProduct } from '../Interfaces/product';
import { fetchProductsData } from './fetchProductsData';

type TypeGetProductsData = (
  productIds: Array<string>,
  onSucces: (data: Array<IProduct>) => void
) => Promise<void>;

export const getProductsData: TypeGetProductsData =
  (productIds, onSucces) => {
    return fetchProductsData(productIds, (e) =>
      fetchProductsData(productIds)
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
      .catch((e) => console.log(e));
  };
