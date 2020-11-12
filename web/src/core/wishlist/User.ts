import { Wishlist } from "./Wishlist";
import { WishlistItem } from "./WishlistItem";

export class User {

  votesLeft: number;
  wishlist: Wishlist;

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string
  ) {}

  vote(wishListItemId: string) {
    if(this.votesLeft > 0) {
      this.wishlist.addVoteTo(wishListItemId)
      this.decrementVotesLeft();
    }
  }

  decrementVotesLeft() {
    this.votesLeft--;
  }

  createWishlist(name: string, votesPerUser: number): Wishlist {
    const wishlist = new Wishlist(name, votesPerUser);
    wishlist.creator = this;
    this.votesLeft = wishlist.votesPerUser;
    this.wishlist = wishlist;
    return wishlist;
  }

  addToWishlist(wishListItem: WishlistItem) {
    this.wishlist.addWishlistItem(wishListItem);
  }

  isEquals(other: User) {
    return this.id === other.id;
  }

}
