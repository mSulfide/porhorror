import React, { useContext, useEffect, useRef, useMemo, useState } from "react";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from '../../App';
import { Button } from "../../components";
import './Exchanger.scss';

const Exchanger: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [comments, setComments] = useState<any[]>([]);
    const [_, setHash] = useState<string>('');
    const commentRef = useRef<HTMLInputElement>(null);
    const lotId = 1;

    /*useEffect(() => {
        const comments = store.getComments(lotId);
        if (comments) {
            setComments(comments);
        }
    });*/

    const addCommentHandler = () => {
        if (commentRef.current) {
            const content = commentRef.current.value;
            if (content) {
                server.addLotComment(lotId, content);
                commentRef.current.value = '';
            }
        }
    };
    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);
    const exchangeClickHandler = () => {
    }

    return (
        <div>
            <h5>Exchanger</h5>
            <div>
                <div className="exchanger-comment">
                    <h5>Comment to lot</h5>
                    <div>
                        {comments.reverse().map((comment, index) => <div key={index}>
                            {`${comment.author} : ${comment.message}`}</div>)}
                    </div>
                    <input ref={commentRef} placeholder='Type a comment...' />
                    <div>
                        <Button onClick={addCommentHandler} text='Отправить' />
                    </div>
                </div>

                <div className="exchanger-buttons">
                    <Button onClick={exchangeClickHandler} text='Обменяться' />
                    <Button onClick={backClickHandler} text='Назад' />
                </div>
            </div>
        </div>
    );
}

export default Exchanger;