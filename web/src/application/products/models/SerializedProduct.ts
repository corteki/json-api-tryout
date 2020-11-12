export interface SerializedProduct {
  type: string;
  id: string;
  attributes: {
    name: string;
    description: string;
  }
}