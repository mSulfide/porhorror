import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Login from './Login/Login';
import GamePage from './Game/Game';
import NotFound from './NotFound/NotFound';
import PHGame from './PorHorror/PHGame';
import Registration from './Registaration/Registration';
import MainMenu from './MainMenu/MainMenu';
import Chat from './Chat/Chat';


export enum PAGES {
    PRELOADER,
    LOGIN,
    REGISTRATION,
    GAME,
    PORHORROR,
    MAIN_MENU,
    CHAT,
    NOT_FOUND
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.PRELOADER);

    return (
        <>
            {page === PAGES.PRELOADER && <Preloader setPage={setPage} />}
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.REGISTRATION && <Registration setPage={setPage} />}
            {page === PAGES.GAME && <GamePage setPage={setPage} />}
            {page === PAGES.PORHORROR && <PHGame setPage={setPage} />}
            {page === PAGES.MAIN_MENU && <MainMenu setPage={setPage} />}
            {page === PAGES.CHAT && <Chat setPage={setPage} />}
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
        </>
    );
}

export default PageManager;