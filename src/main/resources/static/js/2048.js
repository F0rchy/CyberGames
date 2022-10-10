let createAndAppend = function({className, parentElement, value}, tag= 'div') {
    let element = document.createElement(tag);
    element.className = className;
    if (value) {
        element.innerHTML = value;
    }
    parentElement.appendChild(element);

    return element;
}

let getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
    constructor(parentElement, size = 4) {
        this.size = size;

        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        this.rating = 0;

        headerElement.innerHTML = 'Rating: ' + this.rating;


        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        this.field = [];

        for (let i = 0; i < size; i++) {
            this.field[i] = [];
            for (let k = 0; k < size; k++) {
                this.field[i][k] = new Cell(fieldElement);
            }
        }

        window.onkeyup = function(e) {
            switch (e.keyCode) {
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
            }
        }.bind(this);


        console.log(this.field);
    }

    spawnUnit() {
        let emptyCells = [];

        for (let i = 0; i < this.field.length; i++) {
            for (let k = 0; k < this.field[i].length; k++) {
                if (!this.field[i][k].value) {
                    emptyCells.push(this.field[i][k]);
                }
            }
        }

        if (emptyCells.length) {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
        } else {
            alert('You lose');
        }
    }

    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let j = this.size - 2; j >= 0; j--) {
                let currentCell = this.field[i][j];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = j + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != j) {
                            this.field[i][nextCellKey - 1].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }

    isLastKey(key) {
        return key == (this.size - 1);
    }

    isFirstKey(key) {
        return key == 0;
    }

    moveLeft() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let j = 1; j < this.size; j++) {
                let currentCell = this.field[i][j];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = j - 1;
                while (nextCellKey >= 0) {
                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != j) {
                            this.field[i][nextCellKey + 1].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }


    moveDown() {
        let hasMoved = false;
        for (let j = 0; j < this.size; j++) {
            for (let i = this.size - 2; i >= 0; i--) {
                let currentCell = this.field[i][j];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][j];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][j].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
                            this.field[nextCellKey - 1][j].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[nextCellKey][j];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }

    moveUp() {
        let hasMoved = false;
        for (let j = 0; j < this.size; j++) {
            for (let i = 1; i < this.size; i++) {
                let currentCell = this.field[i][j];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i - 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][j];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][j].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
                            this.field[nextCellKey + 1][j].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[nextCellKey][j];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }
}

class Cell {
    constructor(fieldElement) {
        this.element = createAndAppend({
            className: 'cell',
            parentElement: fieldElement
        });



        if (Math.random() > 0.8) {
            this.spawn();
        }
    }

    get value() {
        return this._value || 0;
    }

    set value(value) {
        this._value = value;

        this.element.innerHTML = value == 0 ? '' : value;
    }

    clear() {
        this.value = '';
    }

    merge(cell) {
        this.value += cell.value;
        cell.clear();
    }

    isSameTo(cell) {
        return this.value == cell.value;
    }

    spawn() {
        this.value = Math.random() > 0.5 ? 4 : 2;
    }

    get isEmpty() {
        return this.value == 0;
    }
}

var game = new Game(document.body, 4);