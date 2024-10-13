import { TPoint } from "../..";
import { Physic } from "../../modules/Physic";

type Circle = {
    position: TPoint;
    radius: number;
};

type Obstacle = {
    id: number; 
    circle: Circle; 
};

let obstacleIdCounter = 0; 
const obstacles: Obstacle[] = []; 


export function createObstacle(position: TPoint, radius: number): Obstacle {
    const newObstacle: Obstacle = {
        id: obstacleIdCounter++,
        circle: { position, radius }
    };
    
    obstacles.push(newObstacle);
    
    

    return newObstacle;
}


export function addObstacleFunction(position: TPoint, radius: number): () => Obstacle {
    return () => createObstacle(position, radius);
}


export function removeObstacle(id: number): void {
    const index = obstacles.findIndex(obstacle => obstacle.id === id);
    if (index !== -1) {
        obstacles.splice(index, 1);
       
    }
}


export function checkCollisions(circle: Circle) {
    for (const obstacle of obstacles) {
        if (Physic.doCirclesIntersect(circle, obstacle.circle)) {
            console.log(`Столкновение с препятствием ID: ${obstacle.id}`);
        }
    }
}