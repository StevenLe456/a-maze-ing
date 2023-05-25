class Player {
    constructor() {
        this.pos = [0, 0]
        this.health = 3
    }
}

class Enemy {
    constructor(pos) {
        this.pos = pos
    }
}

export class MazeGenerator {
    constructor() {
        this.dims = {
            2: [50, 50], 
            3: [30, 30, 8], 
            4: [20, 20, 6, 4], 
            5: [15, 15, 5, 5, 5], 
            6: [10, 10, 5, 5, 5, 5],
            7: [10, 10, 5, 5, 3, 3, 3]
        }
        this.num_dims = 2
        this.player = Player()
        this.enemy = []
        for (let i = 0; i < 10; i++) {
            let pos = []
            do {
                pos.push(Math.random() * 50)
                pos.push(Math.random() * 50)
            } while ((!pos[0] > 10 || !pos[0] < 45) && (!pos[1] > 10 || !pos[1] < 45))
            this.enemy.push(Enemy(pos))
        }
        this.directions = {
            "1i": 1,
            "1o": 2,
            "2i": 4,
            "2o": 8,
            "3i": 16,
            "3o": 32,
            "4i": 64,
            "4o": 128,
            "5i": 256,
            "5o": 512,
            "6i": 1024,
            "6o": 2048,
            "7i": 4096,
            "7o": 8192
        }
        this.diff = {
            "1i": [1, 0, 0, 0, 0, 0, 0],
            "1o": [-1, 0, 0, 0, 0, 0, 0],
            "2i": [0, 1, 0, 0, 0, 0, 0],
            "2o": [0, -1, 0, 0, 0, 0, 0],
            "3i": [0, 0, 1, 0, 0, 0, 0],
            "3o": [0, 0, -1, 0, 0, 0, 0],
            "4i": [0, 0, 0, 1, 0, 0, 0],
            "4o": [0, 0, 0, -1, 0, 0, 0],
            "5i": [0, 0, 0, 0, 1, 0, 0],
            "5o": [0, 0, 0, 0, -1, 0, 0],
            "6i": [0, 0, 0, 0, 0, 1, 0],
            "6o": [0, 0, 0, 0, 0, -1, 0],
            "7i": [0, 0, 0, 0, 0, 0, 1],
            "7o": [0, 0, 0, 0, 0, 0, -1]
        }
        this.opposite = {
            "1i": 2,
            "1o": 1,
            "2i": 8,
            "2o": 4,
            "3i": 32,
            "3o": 16,
            "4i": 128,
            "4o": 64,
            "5i": 512,
            "5o": 256,
            "6i": 2048,
            "6o": 1024,
            "7i": 8192,
            "7o": 4096
        }
        this.current_dims = ["1i", "1o", "2i", "2o"]
        this.maze = this.create_nd_array(this.dims[this.num_dims])
    }

    create_nd_array(dims) {
        let arr = []
        let num = 1
        dims.forEach(element => {
            num *= element
        })
        for (let i = 0; i < num; i++) {
            arr.push(0)
        }
        return arr
    }

    get_index(pos) {
        let i = 0
        let num = 0
        pos.forEach(elem => {
            num += Math.pow(this.dims[this.current_dims][i], i) * elem
        })
        return num
    }

    shuffle_array(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
    }

    carve_maze(pos) {
        let dir = shuffle_array(this.current_dims)
        dir.forEach(d => {
            let npos = this.add_list(pos, this.diff[d])
            let b = true
            for (let i = 0; i < npos.length; i++) {
                b = b >= 0 && b < this.current_dims[i] ? b && true : b && false
            }
            if (!b) {
                return
            }
            else {
                this.maze[this.get_index(pos)] |= this.directions[d]
                this.maze[npos] |= this.opposite[d]
                this.carve_maze(npos)
            }
        })
    }

    add_list(arr1, arr2) {
        arr = []
        for (let i = 0; i < arr1.length; i++) {
            arr.push(arr1[i] + arr2[i])
        }
        return arr
    }
}