import { User } from "./User";
import { WishlistItem } from "./WishlistItem";

export class Wishlist {
  id: string;
  creator: User;
  createdOn: Date;
  expiresOn: Date;
  wishlistItems: Array<WishlistItem> = [];
  participants: Array<User> = [];

  constructor(public name: string, public votesPerUser: number) {}

  addWishlistItem(wishlistItem: WishlistItem) {
    this.wishlistItems.push(wishlistItem);
  }
  
  addVoteTo(id: string) {
    const wishlistItem = this.wishlistItems.find(wishlistItem => wishlistItem.id === id);
    if(wishlistItem) {
      wishlistItem.incrementAmountOfVotes();
    }
  }

  addParticipant(participant: User) {
    if(!participant.isEquals(this.creator)) {
      participant.wishlist = this;
      participant.votesLeft = this.votesPerUser;
      this.participants.push(participant);
    }
  }
}