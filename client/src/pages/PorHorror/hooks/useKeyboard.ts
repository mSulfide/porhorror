import { useEffect } from 'react';
import Input from '../../../services/engine/structures/Input/Input';

export interface KeyboardBinding {
    key: string;
    method: (value: boolean) => void;
}

const useKeyboard = (input: Input): void => {

    let yAxis = 0;
    let xAxis = 0;

    const bindings: KeyboardBinding[] = [
        { key: 'w', method: (value) => { yAxis += value ? -1 : 1; input.setAxisY(yAxis); } }, // Вверх
        { key: 's', method: (value) => { yAxis += value ? 1 : -1; input.setAxisY(yAxis); } }, // Вниз
        { key: 'a', method: (value) => { xAxis += value ? -1 : 1; input.setAxisX(xAxis); } }, // Влево 
        { key: 'd', method: (value) => { xAxis += value ? 1 : -1; input.setAxisX(xAxis); } }, // Вправо
        { key: ' ', method: (value) => input.setActiveButton(value) }, // Пробел
    ];

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event);
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

    }, [bindings]);
};

export default useKeyboard;

