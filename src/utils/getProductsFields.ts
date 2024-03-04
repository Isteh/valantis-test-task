import { fetchProductsFields } from './fetchProductsFields';

type TypeGetProductsFields = (
  field: 'brand' | 'price',
  onSucces: (data: Array<string | number>) => void
) => Promise<void>;

export const getProductsFields: TypeGetProductsFields =
  (field, onSucces) => {
    return fetchProductsFields(field, (e) =>
      fetchProductsFields(field)
    )
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
      .catch((e) => console.log(e));
  };
