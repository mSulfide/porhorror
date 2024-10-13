import React, { useState } from "react";
import Button from "../../components/Button/Button";

interface UserPointsProps {
    onPointsSubmit: (points: number[][]) => void;
}

const UserPoints: React.FC<UserPointsProps> = ({ onPointsSubmit }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        const points = inputValue.split(';').map(point => point.split(',').map(Number));
        onPointsSubmit(points);
        setInputValue("");
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введите координаты формат: x,y; x,y"
                style={{
                    margin: '10px',
                    padding: '0 10px 5px 10px',
                    backgroundColor: 'aquamarine',
                    width: '540px',
                }}
            />
            <Button onClick={handleSubmit} text='Отправить координаты' />
        </div>
    );
}

export default UserPoints;
