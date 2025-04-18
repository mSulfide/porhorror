import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Item from '../Item/Item';
import { EItemStatus } from '../../services/server/types';

import './Inventory.scss';

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

    const inventoryClick = async (itemId: number, toEquip: boolean) => {
      setIsLoading(true);
      await server.changeInventory(itemId, toEquip);  // Ждем завершения действия
      setIsLoading(false); 
  }

    const inventory = store.getInventory();
    const pocketItems = inventory.filter(item => item.status === EItemStatus.pocket);
    const unequipItems = inventory.filter(item => item.status === EItemStatus.inventory);

    return (
        <div className="section equipment">

          <div className="section-title">Equipment</div>
          <div className="combined-equipment-inventory">
            <div className="equipment-section">
              {[...pocketItems, ...Array(3 - pocketItems.length).fill(null)].map((item, index) => (
                item ? (
                  <div key={item.id} className="slot filled">
                    <Item item={item}/>
                    <div className="item-button">
                      <button
                      className='off_button'
                      onClick={() => inventoryClick(item.id, false)}
                      >   
                        х 
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={index+3}></div>
                )
              ))}
            </div>

            <div className="inventory">
              <div className="section-title">Inventory</div>
              <div className="inventory-grid">
                {unequipItems?.map((item, index) => (
                  <div key={index}>
                    <Item key={item.id} item={item} />
                    <div className="item-button">
                      <button
                      className='on_button'
                      onClick={() => inventoryClick(item.id, true)}
                      >   
                        надеть
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      )
}

export default Inventory;