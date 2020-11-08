import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sku: string;

  @Column()
  name: string;
  
  isEqual(other: Product) {
    const hasSameId = this.id === other.id;
    const hasSameSku = this.sku === other.sku;
    const hasSameName = this.name === other.name;
    return hasSameId && hasSameSku && hasSameName;
  }
}
