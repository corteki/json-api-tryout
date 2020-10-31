export interface SerializedProduct {
  type: string;
  id: string;
  attributes: {
    sku: string;
  }
}