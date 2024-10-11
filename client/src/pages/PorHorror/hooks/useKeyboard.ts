import { useState, useEffect, useRef } from 'react';
import Input from '../../../services/engine/structures/Input/Input';

interface KeyboardBinding {
    key: string;
    method: (value: boolean) => void;
}

const useKeyboard = (input: Input, canvasRef: React.RefObject<HTMLCanvasElement>): void => {
    const [bindings, setBindings] = useState<KeyboardBinding[]>([]); // bindings: Состояние, хранящее массив объектов KeyboardBinding - описание всех привязок клавиш к методам.
    const isKeyDown = useRef<Record<string, boolean>>({}); // Ref, который хранит объект, где ключи - коды клавиш, а значения - булевы флаги, показывающие, нажата ли клавиша или нет.
    const animationFrameRef = useRef<number>(0); // Добавляение ref для хранения ID анимации

    useEffect(() => {
        if (canvasRef.current) {
            const handleKeyDown = (event: KeyboardEvent) => {
                isKeyDown.current[event.code] = true;
                const binding = bindings.find(b => b.key === event.code);
                if (binding) {
                    binding.method(true);
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                isKeyDown.current[event.code] = false;
                const binding = bindings.find(b => b.key === event.code);
                if (binding) {
                    binding.method(false);
                }
            };

            if (canvasRef.current) {
                canvasRef.current.addEventListener('keydown', handleKeyDown);
                canvasRef.current.addEventListener('keyup', handleKeyUp);
            }

            return () => {
                if (canvasRef.current) {
                    canvasRef.current.removeEventListener('keydown', handleKeyDown);
                    canvasRef.current.removeEventListener('keyup', handleKeyUp);
                }
                cancelAnimationFrame(animationFrameRef.current);
            };
        }
    }, [bindings, canvasRef]);

    // Обновление Input в каждом кадре
    useEffect(() => {
        const animate = () => {
            bindings.forEach(binding => {
                binding.method(isKeyDown.current[binding.key]);
            });
            animationFrameRef.current = requestAnimationFrame(animate); // Обновление ID анимации
        };

        animate(); // Запуск анимации

        return () => cancelAnimationFrame(animationFrameRef.current); // Отмена анимации
    }, [bindings]);

    // Привязка клавиш
    useEffect(() => {
        setBindings([
            { key: 'KeyW', method: input.setActiveButton },
            { key: 'KeyA', method: input.setActiveButton },
            { key: 'KeyS', method: input.setActiveButton },
            { key: 'KeyD', method: input.setActiveButton },
            { key: 'KeySpace', method: input.setActiveButton },
        ]);
    }, [input]);
};

export default useKeyboard;

