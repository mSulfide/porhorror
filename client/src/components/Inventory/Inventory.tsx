import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Button from '../Button/Button';

import './Inventory.scss';

enum EStatus {
    pocket = 'pocket',
    inventory = 'inventory'
}

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

    const inventoryClick = (itemId: number, fromEquipment: boolean) => {
        server.changeInventory(itemId, fromEquipment);
        setIsLoading(true);
    }

    if (isLoading) {
        return (<>...Загрузка</>);
    }

    const inventory = store.getInventory();

    return (
        <div className="section equipment">
            <div className="section-title">Equipment</div>
            <div className="combined-equipment-inventory">
                <div className="equipment-section">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>


                <div className="inventory">
                    <div className="section-title">Inventory</div>
                        <div>
                            {inventory?.map((item, index) => (
                                <div key={index}>
                                    {item.name}
                                    <Button text={item.status === EStatus.pocket ? 'Снять' : 'Надеть'} onClick={() => inventoryClick(item.id, true)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Inventory;