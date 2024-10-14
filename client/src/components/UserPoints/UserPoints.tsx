import React, { useState } from "react";
import Button from "../Button/Button";
import { TPoint } from "../../config";

interface UserPointsProps {
    onPointsSubmit: (points: TPoint[]) => void;
}

const UserPoints: React.FC<UserPointsProps> = ({ onPointsSubmit }) => {
    const [points, setPoints] = useState<TPoint[]>([{ x: 0, y: 0 }]);

    const handlePointChange = (index: number, coord: "x" | "y", value: number) => {
        const newPoints = [...points];
        newPoints[index] = { ...newPoints[index], [coord]: value };
        setPoints(newPoints);
    };

    const addPoint = () => {
        setPoints([...points, { x: 0, y: 0 }]);
    };

    const handleSubmit = () => {
        onPointsSubmit(points);
        setPoints([{ x: 0, y: 0 }]);
    };

    return (
        <div>
            {points.map((point, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                    <input
                        type="number"
                        value={point.x}
                        onChange={(e) => handlePointChange(index, "x", Number(e.target.value))}
                        placeholder="x"
                        style={{
                            margin: '10px',
                            padding: '0 10px 5px 10px',
                            width: '100px',
                            backgroundColor: 'aquamarine',
                        }}
                    />
                    <input
                        type="number"
                        value={point.y}
                        onChange={(e) => handlePointChange(index, "y", Number(e.target.value))}
                        placeholder="y"
                        style={{
                            margin: '10px',
                            padding: '0 10px 5px 10px',
                            width: '100px',
                            backgroundColor: 'aquamarine',
                        }}
                    />
                </div>
            ))}
            <Button onClick={addPoint} text='Добавить точку' />
            <Button onClick={handleSubmit} text='Отправить координаты' />
        </div>
    );
};

export default UserPoints;
