
import { CardCategory } from "./card-category";
import CardIcon from "./card-icon";
import CardRegular from "./card-regular";
import { SimpleCategoryCard } from "./card-simple-category";
import CardText from "./card-text";
import CardTitle from "./card-title";
import CardWrapper from "./card-wrapper";

export const Card = {
    // Cards
    Regular: CardRegular,
    Wrapper: CardWrapper,

    Category: {
        Simple: SimpleCategoryCard,
        Regular: CardCategory
    },
    
    // Features
    Icon: CardIcon,
    Title: CardTitle,
    Text: CardText
}