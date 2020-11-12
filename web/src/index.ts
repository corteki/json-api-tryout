// import "reflect-metadata";
import express from "express";
import { Image } from "./core/wishlist/Image";
// import { createConnection } from "typeorm";
// import { bootstrap } from "./Bootstrap";

import { User } from "./core/wishlist/User";
import { WishlistItem } from "./core/wishlist/WishlistItem";

export const app = express();

// createConnection().then(bootstrap(app)).catch(error => console.log(error));


const creator = new User("a", "Tim", "Alaerts");
const participant = new User("b", "Test", "User");
const wishlist = creator.createWishlist("test-list", 5, 3);
const firstItemImage = new Image("/xs-image.jpeg", "/sm-image.jpeg", "m-image.jpeg", "l-image.jpeg");
const firstItem = new WishlistItem("def-1", firstItemImage, "test item", "5 euro");

creator.addToWishlist(firstItem)
wishlist.addParticipant(participant);

creator.vote(firstItem.id);
creator.vote(firstItem.id);
creator.vote(firstItem.id);
creator.vote(firstItem.id);
creator.vote(firstItem.id);
creator.vote(firstItem.id);

participant.vote(firstItem.id);
participant.vote(firstItem.id);
participant.vote(firstItem.id);
participant.vote(firstItem.id);
participant.vote(firstItem.id);

console.log(wishlist);

