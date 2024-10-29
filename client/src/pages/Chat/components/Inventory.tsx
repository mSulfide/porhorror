import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../../App';
import Button from '../../../components/Button/Button';

const Inventory: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const result = await server.getInventory();
            setIsLoading(!result);
        })();
    });

    const inventoryClick = (itemId: number) => {
        console.log(itemId);
        //setIsLoading(true);
    }

    const equipmentClick = (itemId: number) => {
        console.log(itemId);
        //setIsLoading(true);
    }

    if (isLoading) {
        return (<>...Загрузка</>);
    }

    const inventory = store.getInventory();
    const equipment = store.getEquipment();

    return (<div>
        <h1>Inventory</h1>
        <div>
            <span>сумка:</span>
            <div>
                {inventory.map((item, index) => (<div key={index}>
                    {item.name}
                    <Button text='Надеть' onClick={() => inventoryClick(item.id)} />
                </div>))}
            </div>
        </div>
        <div>
            <span>карманы:</span>
            <div>
                {equipment.map((item, index) => (<div key={index}>
                    {item.name}
                    <Button text='Снять' onClick={() => equipmentClick(item.id)} />
                </div>))}
            </div>
        </div>
    </div>)
}

export default Inventory;