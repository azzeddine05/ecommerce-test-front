import type { GetProductsResponse } from '@/types'

export default {
  getProducts: (): Promise<GetProductsResponse> => {
    return fetch('http://127.0.0.1:8000/api/products').then((res) => res.json())
  }
}
