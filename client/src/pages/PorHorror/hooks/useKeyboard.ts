import { useEffect, useRef } from 'react';
import Input from '../../../services/engine/structures/Input/Input';

export interface KeyboardBinding {
    key: string;
    method: (value: boolean) => void;
}

const useKeyboard = (input: Input): void => {
    const bindings: KeyboardBinding[] = [
        { key: 'w', method: () => input.setAxisY(-1) }, // Вверх
        { key: 's', method: () => input.setAxisY(1) }, // Вниз
        { key: 'a', method: () => input.setAxisX(-1) }, // Влево
        { key: 's', method: () => input.setAxisX(1) }, // Вправо
        { key: ' ', method: () => input.setActiveButton(true) }, // Пробел 
    ];

    useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                console.log(event);
                const binding = bindings.find(b => b.key === event.code);
                if (binding) {
                    binding.method(true);
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                const binding = bindings.find(b => b.key === event.code);
                if (binding) {
                    binding.method(false);
                }
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

