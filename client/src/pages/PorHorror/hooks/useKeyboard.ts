import { useEffect } from 'react';
import Input from '../../../services/engine/structures/Input/Input';

export interface KeyboardBinding {
    key: string;
    method: (value: boolean) => void;
}

const useKeyboard = (input: Input): void => {
    // Флаги для отслеживания состояния каждой клавиши
    let isWPressed: boolean = false; // Для движения вверх W
    let isAPressed: boolean = false; // Для движения влево A
    let isSPressed: boolean = false; // Для движения вниз S
    let isDPressed: boolean = false; // Для движения вправо D

    const axisX = () => { 
        input.setAxisX(Number(isDPressed) - Number(isAPressed)); 
    }
    
    const axisY = () => { 
        input.setAxisY(Number(isWPressed) - Number(isSPressed)); 
    }

    const bindings: KeyboardBinding[] = [
        { key: 'KeyW', method: (value) => { 
            isWPressed = value; 
            axisY(); 
        } },

        { key: 'KeyS', method: (value) => { 
            isSPressed = value; 
            axisY(); 
        } },
        
        { key: 'KeyA', method: (value) => { 
            isAPressed = value; 
            axisX(); 
        } },
        
        { key: 'KeyD', method: (value) => { 
            isDPressed = value; 
            axisX(); 
        } },
        
        { key: 'Space', method: (value) => { 
            input.setActiveButton(value); 
        } },
    ];

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            bindings.find(b => b.key === event.code)?.method(true);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            bindings.find(b => b.key === event.code)?.method(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, []);
};

export default useKeyboard;

