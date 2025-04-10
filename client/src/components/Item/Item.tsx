import React, { useContext, useEffect} from 'react';
import { ServerContext} from '../../App';
import Button from '../Button/Button';
import { TItem } from '../../services/server/types';

import './Item.scss';

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

    const inventoryClick = (itemId: number, toEquip: boolean) => {
        server.changeInventory(itemId, toEquip);
        setIsLoading(true);
    }
    

    return (
            <div key={item.id}>
                {item.name}
                <Button text={item.status === EStatus.pocket? 'x': item.status === EStatus.inventory? 'надеть': '???'} 
                onClick={() => inventoryClick(item.id, toEquip)} />
            </div>
        )
}

export default Item;