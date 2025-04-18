import React, { useContext, useEffect, useState } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Button from '../Button/Button';
import Item from '../Item/Item';
import { EItemStatus, TItem, TLot, TUpdateExchangerResponse } from '../../services/server/types'; 

import './Exchanger.scss';

const Exchanger: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();
    const [lots, setLots] = useState<TLot[]>([]);
    const [_, setHash] = useState<string>('');
    const [isCreateLot, setCreateLot] = useState<boolean>(false);
    const [chooseSellItem, setChooseSellItem] = useState<boolean>(false);
    const [chooseNeedItem, setChooseNeedItem] = useState<boolean>(false);
    const [sellItem, setSellItem] = useState<TItem | null>(null);
    const [needItem, setNeedItem] = useState<TItem | null>(null);
    const inventory = store.getInventory();

    useEffect(() => {
        (async () => {
            if (!store.getItemsList().length) {
                await server.getItemsList();
            }

            const updateExchangerHandler = ({ hash, lots }: TUpdateExchangerResponse) => {
                if (lots) {
                    setLots(lots);
                }
                setHash(hash);
            };

            if (user) {
                server.startExchagerUpdate(updateExchangerHandler);
            }

            return () => {
                server.stopExchangerUpdate();
            };
        })();
    });

    const itemList = store.getItemsList();

    const createLot = async () => {
        if (sellItem && needItem && user) {
            await server.createLot(sellItem.id, needItem.id);
            console.log(needItem)
            setCreateLot(false);
            setSellItem(null);
            setNeedItem(null);
            setChooseSellItem(false);
            setChooseNeedItem(false);
        }
    };

    const cancelCreateLot = async () => {
        setCreateLot(false);
        setSellItem(null);
        setNeedItem(null);
        setChooseSellItem(false);
        setChooseNeedItem(false);
    };

    const exchange = async (lotId: number) => {
        await server.exchange(lotId);
    };

    const deleteLot = (lotId: number) => {
        server.deleteLot(lotId);
    };

    const isItemInInventory = (itemId: number) => {
        return itemList.some(item => item.id === itemId);
    };
    
    if (!lots) {
        return <></>
    }

    return (
        <div className="exchanger">
            {!isCreateLot && <Button text="Создать лот" onClick={() => setCreateLot(true)} />}
            
            {isCreateLot && (
                <div className="create_lot">
                    <Button text="Отмена" onClick={() => cancelCreateLot()} />
                    <div className="selected_items">
                        {sellItem && <Item item={sellItem} />}
                        →
                        {needItem && <Item item={needItem} />}
                    </div>

                    {!chooseSellItem && (
                        <div className="choose_section">
                            <div className="section_title">Выбери предмет для обмена</div>
                            <div className="items_grid">
                            {inventory?.map((item, index) => {
                                if (isItemInInventory(item.id) && item.status !== EItemStatus.exchange) {
                                return (
                                    <div key={index} className="item_option" onClick={() => {
                                    setSellItem(item);
                                    setChooseSellItem(true);
                                    }}>
                                    <div className="item_container">
                                        <Item item={item} />
                                    </div>
                                    <button 
                                        className="select_button"
                                        onClick={() => {
                                        setSellItem(item);
                                        setChooseSellItem(true);
                                        }} 
                                    >Выбрать
                                    </button>
                                    </div>
                                );
                                }
                                return null;
                            })}
                            </div>
                        </div>
                    )}

                    {!chooseNeedItem && (
                    <div className="choose_section">
                        <div className="section_title">Выбери нужный предмет</div>
                        <div className="items_grid">
                        {itemList?.map((item, index) => (
                            <div key={index} className="item_option" onClick={() => {
                            setNeedItem(item);
                            setChooseNeedItem(true);
                            }}>
                            <div className="item_container">
                                <Item item={item} />
                            </div>
                            <button 
                                className="select_button"
                                onClick={() => {
                                setNeedItem(item);
                                setChooseNeedItem(true);
                                }} 
                            > Выбрать 
                            </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}

                    {chooseSellItem && chooseNeedItem && (
                        <Button text="Выставить лот" onClick={createLot} />
                    )}
                </div>
            )}

            <div className="lots_section">
            {lots?.map((lot, index) => (
                <div key={index} className="lot_card">
                <div className="lot_header">
                    <span className="lot_owner">
                    {lot.sellerId === user?.id ? "Ваш лот" : `От ${lot.sellerName || 'пользователя'}`}
                    </span>
                    {lot.sellerId === user?.id && (
                    <button 
                        className="delete_button" 
                        onClick={() => deleteLot(lot.id)}
                    >
                        Удалить
                    </button>
                    )}
                </div>
                
                <div className="lot_content">
                    <div className="trade_item">
                    <span className="item_label">Отдаете:</span>
                    <div className="item_container">
                        <Item item={lot.sellItem} />
                    </div>
                    </div>
                    
                    <span className="trade_arrow">→</span>
                    
                    <div className="trade_item">
                    <span className="item_label">Получаете:</span>
                    <div className="item_container">
                        <Item item={lot.needItem} />
                    </div>
                    </div>
                </div>
                
                {lot.sellerId !== user?.id && (
                    <div className="lot_footer">
                    <button 
                        className="exchange_button" 
                        onClick={() => exchange(lot.id)}
                    >
                        Обменять
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default Exchanger;
