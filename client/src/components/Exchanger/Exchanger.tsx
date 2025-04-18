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
            setCreateLot(false);
            setSellItem(null);
            setNeedItem(null);
            setChooseSellItem(false);
            setChooseNeedItem(false);
        }
    };

    const exchange = async (lotId: number) => {
        // await server.exchange(lot.id);
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
                    <Button text="Отмена" onClick={() => setCreateLot(false)} />
                    <div className="selected_items">
                        {sellItem && <Item item={sellItem} />}
                        --
                        {needItem && <Item item={needItem} />}
                    </div>

                    {!chooseSellItem && (
                        <div className="choose_section">
                            <span>Выбери предмет для обмена</span>
                            {inventory?.map((item, index) => {
                                if (isItemInInventory(item.id) && item.status != EItemStatus.exchange) {
                                    return (
                                        <div key={index} className="item_option">
                                            <Item item={item} />
                                            <Button text="Выбрать" onClick={() => {
                                                setSellItem(item);
                                                setChooseSellItem(true);
                                            }} />
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )}

                    {!chooseNeedItem && (
                        <div className="choose_section">
                            <span>Выбери нужный тебе предмет</span>
                            {itemList?.map((item, index) => (
                                <div key={index} className="item_option">
                                    <Item item={item} />
                                    <Button text="Выбрать" onClick={() => {
                                        setNeedItem(item);
                                        setChooseNeedItem(true);
                                    }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {chooseSellItem && chooseNeedItem && (
                        <Button text="Выставить лот" onClick={createLot} />
                    )}
                </div>
            )}

            <div className="lots_section">
                {lots?.map((lot, index) => {

                    return (
                        <div key={index} className="lot_card">
                            {lot.sellerId === user?.id && <Button text='удалить лот' onClick={() => deleteLot(lot.id)}/>}
                            <div>
                                <span>{user?.name} предлагает:</span>
                                <Item item={lot.sellItem} />
                            </div>
                            <div>
                                <span> обменять на </span>
                                <Item item={lot.needItem} />
                            </div>
                            {lot.sellerId != user?.id && <Button text='обменять' onClick={() => exchange(lot.id)}/>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Exchanger;
