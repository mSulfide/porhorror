import React, { useContext } from 'react';
import { ServerContext } from '../../App';
import { TItem } from '../../services/server/types';
import cookieIMG from '../../assets/img/alpha/Items/cookie_item.png';
import photo1IMG from '../../assets/img/alpha/Items/photo1_item.png';
import photo2IMG from '../../assets/img/alpha/Items/photo2_item.png';
import coffeeIMG from '../../assets/img/alpha/Items/coffee_item.png';
import waterCanIMG from '../../assets/img/alpha/Items/water_can_item.png';
import paperIMG from '../../assets/img/alpha/Items/paper_item.png';
import gradeBookIMG from '../../assets/img/alpha/Items/grade_book_item.png';

import './Item.scss';
import { ESprite } from '../../game/resources';

enum EStatus {
    pocket = 'pocket',
    inventory = 'inventory'
}

interface IItem {
    item: TItem;
    toEquip: boolean;
    setIsLoading: (name: boolean) => void;
}

const Item: React.FC<IItem> = (props) => {

    const {item, toEquip, setIsLoading} = props;
    const server = useContext(ServerContext);

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
    
    const inventoryClick = async (itemId: number, toEquip: boolean) => {
        setIsLoading(true);
        await server.changeInventory(itemId, toEquip);  // Ждем завершения действия
        setIsLoading(false); 
    }

    return (
        <div key={item.id} className="item">
          <img src={itemImage} alt={item.name} />
          <div className="item-name">{item.name}</div>
          <div className="item-button">
            <button
              className='on_button'
              onClick={() => inventoryClick(item.id, toEquip)}
            >   {item.status === EStatus.pocket ? 'x' : item.status === EStatus.inventory ? 'надеть' : '???'} 
            </button>
          </div>
        </div>
      );
      
}

export default Item;