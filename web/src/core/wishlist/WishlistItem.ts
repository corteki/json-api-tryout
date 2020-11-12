import { Image } from "./Image";

export class WishlistItem {
  
  amountOfVotes: number = 0;

  constructor(
    public id: string,
    public image: Image,
    public description: string,
    public price: string
  ) {}
  
  incrementAmountOfVotes() {
    this.amountOfVotes++;
  }

}