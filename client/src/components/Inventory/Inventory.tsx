import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Item from '../Item/Item';

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

    if (isLoading) {
        return (<>...Загрузка</>);
    }

    const inventory = store.getInventory();
    const pocketItems = inventory.filter(item => item.status === EStatus.pocket);
    const unequipItems = inventory.filter(item => item.status === EStatus.inventory);

    return (
        <div className="section equipment">
            <div className="section-title">Equipment</div>
            <div className="combined-equipment-inventory">
                <div className="equipment-section">
                  {[...pocketItems, ...Array(3 - pocketItems.length).fill(null)].map((item, index) => (
                    item ? (
                      <div key={item.id} className="slot filled">
                        <Item item={item} setIsLoading={setIsLoading} toEquip={false} />
                      </div>
                    ) : (
                      <div key={`empty-${index}`} className="slot empty"></div>
                    )
                  ))}
                </div>

                <div className="inventory">
                  <div className="section-title">Inventory</div>
                  <div className="inventory-grid">
                    {unequipItems?.map(item => (
                      <Item key={item.id} item={item} setIsLoading={setIsLoading} toEquip={true} />
                    ))}
                  </div>
                </div>

                </div>  
            </div>
        )
}

export default Inventory;