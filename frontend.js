'use strict';

class Node {
    constructor() {
        this.sons = [];
        this.directions = [];
        this.root = false;
    }
    mark_root() {
        this.root = true;
    }
}

class Square {
    constructor() {
        this.north = false;
        this.east = false;
        this.south = false;
        this.west = false;
    }
    set_north(north) {
        this.north = north;
    }
    set_east(east) {
        this.east = east;
    }
    set_south(south) {
        this.south = south;
    }
    set_west(west) {
        this.west = west;
    }
}

function compute_square(father_node, i, j, marked_squares, m, n) {
    let valid_directions = [0, 1, 2, 3]; // north, east, south, west
    for(let i1 = 0; i1 < 4; i1++) {
        let i2 = Math.floor(Math.random() * valid_directions.length)
        let direction = valid_directions[i2];
        valid_directions.splice(i2, 1);
        let i_next = i; let j_next = j;
        switch(direction) {
            case 0:
                i_next = i - 1;
                break;
            case 1:
                j_next = j + 1;
                break;
            case 2:
                i_next = i + 1;
                break;
            case 3:
                j_next = j - 1;
                break;
        }
        
        if(i_next >= 0 && i_next < m && j_next >= 0 && j_next < n && 
           marked_squares[i_next][j_next] === false) {
            marked_squares[i_next][j_next] = true;
            let node = new Node();
            father_node.sons.push(node);
            father_node.directions.push(direction);
            marked_squares = compute_square(node, i_next, j_next, 
                marked_squares, m, n);
        } 
    }
    return marked_squares;
}

function buildMaze(parent_node, i, j, maze) {
    if(parent_node.sons.length > 0) {
        parent_node.directions.forEach(direction => {
            switch(direction) {
                case 0:
                    maze[i][j].set_north(true);
                    break;
                case 1:
                    maze[i][j].set_east(true);
                    break;
                case 2:
                    maze[i][j].set_south(true);
                    break;
                case 3:
                    maze[i][j].set_west(true);
                    break;
            }
        });    
    }
    if(parent_node.sons.length > 0) {
        let i_next, j_next;
        for(let k = 0; k < parent_node.sons.length; k++) {
            i_next = i; j_next = j;
            switch(parent_node.directions[k]) {
                case 0:
                    i_next = i - 1;
                    break;
                case 1:
                    j_next = j + 1;
                    break;
                case 2:
                    i_next = i + 1;
                    break;
                case 3:
                    j_next = j - 1;
                    break;
            }
            maze = buildMaze(parent_node.sons[k], i_next, j_next, maze);
        }    
    }
    return maze;
}

function drawMaze() {
    const m = 3; const n = 3;
    const i_start = 0; const j_start = 0;
    let marked_squares = new Array(m);
    for(let i = 0; i < m; i++) {
        const row = new Array(n);
        row.fill(false)
        marked_squares[i] = row;
    }
    marked_squares[i_start][j_start] = true;
    let root = new Node();
    root.mark_root();
    marked_squares = compute_square(root, i_start, j_start, marked_squares, m, n);
    let maze = new Array(m);
    for(let i = 0; i < m; i++) {
        maze[i] = new Array(n);
        for(let j = 0; j < n; j++) {
            maze[i][j] = new Square();
        }
    }
    maze = buildMaze(root, i_start, j_start, maze);
    const canvas = document.getElementById('maze0');
    const context = canvas.getContext('2d');
    let square_size = 25; let litte_square_size = 10;
    let margin = square_size - litte_square_size;
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            let x_exterior = square_size * i; 
            let y_exterior = square_size * j;
            let x_interior = x_exterior + margin;
            let y_interior = y_exterior + margin;
            let square = maze[i][j];
            if(square.north === true) {
                context.moveTo(x_interior, y_interior);
                context.lineTo(x_exterior + margin, y_exterior);
                context.stroke();
                context.moveTo(x_interior + litte_square_size, y_interior);
                context.lineTo(x_exterior + margin + litte_square_size, 
                    y_exterior);
                context.stroke();
            }
            else {
                context.moveTo(x_interior, y_interior);
                context.lineTo(x_interior + litte_square_size, y_interior)
                context.stroke();  
            }
            if(square.east === true) {
                context.moveTo(x_interior + litte_square_size, y_interior);
                context.lineTo(x_exterior + square_size, y_exterior + margin);
                context.stroke();
                context.moveTo(x_interior + litte_square_size, y_interior + 
                    litte_square_size);
                context.lineTo(x_exterior + square_size, y_exterior + margin 
                    + litte_square_size);
                context.stroke();
            }
            else {
                context.moveTo(x_interior + litte_square_size, y_interior);
                context.lineTo(x_interior + litte_square_size, 
                    y_interior + litte_square_size);
                context.stroke();  
            }
            if(square.south === true) {
                context.moveTo(x_interior + litte_square_size, y_interior);
                context.lineTo(x_exterior + margin + litte_square_size, y_exterior 
                    + square_size);
                context.stroke();
                context.moveTo(x_interior, y_interior + litte_square_size);
                context.lineTo(x_exterior + margin, y_exterior + square_size);
                context.stroke();
            }
            else {
                context.moveTo(x_interior + litte_square_size, y_interior + 
                    litte_square_size);
                context.lineTo(x_interior, y_interior + litte_square_size);
                context.stroke();  
            }
            if(square.west === true) {
                context.moveTo(x_interior, y_interior + litte_square_size);
                context.lineTo(x_exterior, y_exterior + margin + square_size);
                context.stroke();
                context.moveTo(x_interior, y_interior);
                context.lineTo(x_exterior, y_exterior + margin);
                context.stroke();
            }
            else {
                context.moveTo(x_interior, y_interior + square_size);
                context.lineTo(x_interior, y_interior);
                context.stroke();  
            }

        }
    }
}
