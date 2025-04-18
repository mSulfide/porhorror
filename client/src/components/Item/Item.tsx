import React from 'react';
import { TItem } from '../../services/server/types';
import cookieIMG from '../../assets/img/alpha/Items/cookie_item.png';
import photo1IMG from '../../assets/img/alpha/Items/photo1_item.png';
import photo2IMG from '../../assets/img/alpha/Items/photo2_item.png';
import coffeeIMG from '../../assets/img/alpha/Items/coffee_item.png';
import waterCanIMG from '../../assets/img/alpha/Items/water_can_item.png';
import paperIMG from '../../assets/img/alpha/Items/paper_item.png';
import gradeBookIMG from '../../assets/img/alpha/Items/grade_book_item.png';
import { ESprite } from '../../game/resources';

import './Item.scss';

interface IItem {
    item: Omit<TItem, 'status'> | TItem;
}

const Item: React.FC<IItem> = (props) => {

    const {item} = props;

    let itemImage: string;

    switch (item.image) {
        case ESprite.cookieITM:
            itemImage = cookieIMG;
            break;
        case ESprite.horizPhotoITM:
            itemImage = photo1IMG;
            break;
        case ESprite.verticPhotoITM:
            itemImage = photo2IMG;
            break;
        case ESprite.coffeeITM:
            itemImage = coffeeIMG;
            break;
        case ESprite.wateringCanITM:
            itemImage = waterCanIMG;
            break; 
        case ESprite.paperITM:
            itemImage = paperIMG;
            break;
        case ESprite.gradeBookITM:
            itemImage = gradeBookIMG;
            break;  
        default:
            itemImage = '';
            break;
    }
    console.log(item.image)

    return (
        <div key={item.id} className="item">
            <img src={itemImage} alt={item.name} />
            <div className="item-name">{item.name}</div>
        </div>
      );
      
}

export default Item;