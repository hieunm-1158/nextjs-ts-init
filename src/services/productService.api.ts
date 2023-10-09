import { IProduct } from '@/typings/product.type';

import http from '../utils/http';

const getKeyDetailProduct = (id: string | number) => {
  return `/products/${id}`;
};

const getDetailProduct = async (url: string) => {
  const res = await http.get<IProduct>(url);
  return res.data;
};

export { getKeyDetailProduct, getDetailProduct };
