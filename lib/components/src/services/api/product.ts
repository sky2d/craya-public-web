import { ApiReturn, Product, ProductDetail, ProductReviewResult, ProductSKU, RecentSearched, SimpleProduct } from "../../interfaces";
import { Order, TrackingData } from "../../interfaces/orders";
import { deleteRequest, getRequest, postRequest, putRequest } from "./apiRequests";

const createProductPayload = (product: SimpleProduct) => ({
  storeId: product.storeId,
  sizeProfile: product.sizeProfile,
  name: product.name,
  price: product.price,
  description: product.description,
  shortDescription: product.shortDescription,
  additionalImageIds: product.additionalImageIds,
  weightInGrams: product.weightInGrams,
  selectedSizeChartImageId: product.selectedSizeChartImageId,
});

const createProductDetailPayload = (productDetail: ProductDetail, productId: string) => ({
  productId,
  type: productDetail.type,
  value: productDetail.value,
});

const createProductSKUPayload = (productSKU: ProductSKU, productId: string) => ({
  productId: productSKU.productId || productId,
  skuCombineKey: productSKU.skuCombineKey,
  color: productSKU.color,
  imageIds: productSKU.imageIds,
  size: productSKU.size,
  quantity: productSKU.quantity,
});

export const fetchProducts = (storeId: string, token?: string) => {
  return getRequest<SimpleProduct[]>({
    endpoint: "/products",
    params: { storeId },
    token: token,
  });
};

export const fetchProduct = (productId: string, token?: string) => {
  return getRequest<Product>({ endpoint: `/products/${productId}`, token: token });
};

export const createProduct = async (product: Product): Promise<ApiReturn<Product>> => {
  const productPayload = createProductPayload(product);
  const productResponse = await postRequest<SimpleProduct>({
    endpoint: "/products",
    body: productPayload,
  });

  if (productResponse.error) return { error: productResponse.error };
  if (!productResponse.data) return { error: "Unable to create product" };

  const createdProduct = productResponse.data;

  const productDetailPromises = product.productDetails.map(productDetail =>
    postRequest<ProductDetail>({
      endpoint: "/products/detail",
      body: createProductDetailPayload(productDetail, createdProduct.id!),
    }),
  );

  const skuPayLoad = product.productSKUs.filter(sku => sku.size != null);
  const productSKUPromises = skuPayLoad.map(productSKU =>
    postRequest<ProductSKU>({
      endpoint: "/products/sku",
      body: createProductSKUPayload(productSKU, createdProduct.id!),
    }),
  );

  const productDetailsResponse = await Promise.all(productDetailPromises);
  const productSKUsResponse = await Promise.all(productSKUPromises);

  const productDetails = productDetailsResponse.map(item => item.data).filter(item => !!item);
  const productSKUs = productSKUsResponse.map(item => item.data).filter(item => !!item);

  const newProduct: Product = {
    ...createdProduct,
    productDetails,
    productSKUs,
  };
  return { data: newProduct };
};

export const updateProduct = (product: SimpleProduct) => {
  // updates only product, not productDetails or productSKUs
  return putRequest<Product>({
    endpoint: `/products/${product.id}`,
    body: createProductPayload(product),
  });
};

export const updateProductDetails = async (productDetails: ProductDetail[], productId?: string) => {
  // updates productDetails by deleting and creating all of them
  const updatedProductDetails = productDetails.map(productDetail => ({
    productId: productId,
    type: productDetail.type,
    value: productDetail.value,
  }));

  productDetails = productDetails.filter(item => item.id);
  const deleteProductDetailPromises = productDetails.map(productDetail => deleteRequest<null>({ endpoint: `/products/detail/${productDetail.id}` }));

  await Promise.all(deleteProductDetailPromises);
  const productDetailPromises = updatedProductDetails.map(productDetail =>
    postRequest<ProductDetail>({
      endpoint: `/products/detail`,
      body: createProductDetailPayload(productDetail, productDetail.productId!),
    }),
  );

  const productDetailsResponse = await Promise.all(productDetailPromises);
  const newProductDetails = productDetailsResponse.map(item => item.data).filter(item => !!item);

  return { data: newProductDetails };
};

export const updateProductSKU = async (originalProductSKUs: ProductSKU[] | null, updatedProductSKUs: ProductSKU[]) => {
  // updates productSKUs by deleting and creating all of them
  // update, delete

  const productsSKUsToDelete = originalProductSKUs?.filter(item => item.id);

  const deleteProductSKUPromises = productsSKUsToDelete?.map(productSKU => deleteRequest<null>({ endpoint: `/products/sku/${productSKU.id}` }));

  if (deleteProductSKUPromises) {
    await Promise.all(deleteProductSKUPromises);
  }

  const productSKUPromises = updatedProductSKUs.map(productSKU =>
    postRequest<ProductSKU>({
      endpoint: `/products/sku`,
      body: createProductSKUPayload(productSKU, productSKU.id!),
    }),
  );

  const productSKUsResponse = await Promise.all(productSKUPromises);
  const newProductSKUs = productSKUsResponse.map(item => item.data).filter(item => !!item);

  return { data: newProductSKUs };
};

export const getProductDetailsById = (productId: string) => {
  return getRequest<Product>({
    endpoint: `/products/${productId}`,
  });
};

export const searchProducts = (query: string, token?: string) => {
  return getRequest<SimpleProduct[]>({
    endpoint: `/search/products`,
    params: { query },
    token,
  });
};

export const searchProductsByTag = (tags: string[], token?: string) => {
  return getRequest<Product[]>({
    endpoint: "/search/products",
    params: { tags: tags.join(",") },
    token,
  });
};

export const recentSearchesProducts = () => {
  return getRequest<RecentSearched[]>({
    endpoint: "/search/history",
  });
};

export const getProductDetails = (storeId?: string) => {
  return getRequest<ProductDetail[]>({
    endpoint: "/products/details",
    params: { storeId: storeId || "" },
  });
};

export const fetchReviews = (productId: string) => {
  return getRequest<ProductReviewResult>({
    endpoint: "/reviews",
    params: { productId: productId },
  });
};

export const trackOrder = (order: Order, token?: string) => {
  return getRequest<TrackingData>({
    endpoint: `/orders/${order.id}/track`,
    token: token,
  });
};

export const getBestSellingProduct = (storeId: string, limit?: string) => {
  return getRequest<SimpleProduct[]>({
    endpoint: `/products/best-selling/${storeId}`,
    params: { limit: limit ? limit : "" },
  });
};

export const getNewArrivalProduct = (storeId: string, limit?: string) => {
  return getRequest<SimpleProduct[]>({
    endpoint: `/products/new-arrivals/${storeId}`,
    params: { limit: limit ? limit : "" },
  });
};
