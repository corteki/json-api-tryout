import { Serialized } from "./Serialized";

export interface ISerializer<I> {
  create(input: I): Serialized<I>;
}