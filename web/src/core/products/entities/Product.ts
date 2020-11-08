import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;
  
}
