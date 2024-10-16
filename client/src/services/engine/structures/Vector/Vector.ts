export class Vector {
    x: number;
    y: number;
   
    constructor(x: number = 0, y: number = 0) {
     this.x = x;
     this.y = y;
    }
   
    // Сложение векторов
    add(other: Vector): Vector {
     return new Vector(this.x + other.x, this.y + other.y);
    }
   
    // Вычитание векторов
    subtract(other: Vector): Vector {
     return new Vector(this.x - other.x, this.y - other.y);
    }
   
    // Умножение вектора на скаляр
    multiplyScalar(scalar: number): Vector {
     return new Vector(this.x * scalar, this.y * scalar);
    }
   
    // Скалярное произведение векторов
    dot(other: Vector): number {
     return this.x * other.x + this.y * other.y;
    }
   
    // Длина вектора
    length(): number {
     return Math.sqrt(this.x * this.x + this.y * this.y);
    }
   
    // Нормализация вектора
    normalize(): Vector {
     const length = this.length();
     if (length === 0) {
      return new Vector();
     }
     return new Vector(this.x / length, this.y / length);
    }
   
    // Проверка на равенство векторов
    equals(other: Vector): boolean {
     return this.x === other.x && this.y === other.y;
    }
   }
