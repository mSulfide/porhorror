import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Item from '../Item/Item';
import { EItemStatus, TItem, TUpdateInventoryResponse } from '../../services/server/types';
import './Inventory.scss';

const Inventory: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();
    const [inventory, setInventory] = useState<TItem[]>([]);
    const [pocketItems, setPocketItems] = useState<TItem[]>([]);
    const [unequipItems, setUnequipItems] = useState<TItem[]>([]);
    const [_, setHash] = useState<string>('');

    useEffect(() => {
        const updateInventoryHandler = ({ slots, hash }: TUpdateInventoryResponse) => {
            if (slots) {
                setInventory(slots);
                store.setInventory({slots});
                setPocketItems(slots.filter(item => item.status === EItemStatus.pocket));
                setUnequipItems(slots.filter(item => item.status === EItemStatus.inventory));
            }
            setHash(hash);
        };

        if (user) {
            server.startInventoryUpdate(updateInventoryHandler);
        }

        return () => {
            server.stopInventoryUpdate();
        };
    }, [user, server]); // Добавлены зависимости

    if (inventory.length < 1) {
        return (<>...Загрузка</>);
    }

    const inventoryClick = async (itemId: number, toEquip: boolean) => {
        await server.changeInventory(itemId, toEquip);  
    }

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
                            <div key={`empty-${index}`} className="slot empty"></div>
                        )
                    ))}
                </div>

                <div className="inventory">
                    <div className="section-title">Inventory</div>
                    <div className="inventory-grid">
                        {unequipItems.map((item) => (
                            <div key={item.id} className="inventory-item">
                                <Item item={item} />
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
    );
}

export default Inventory;