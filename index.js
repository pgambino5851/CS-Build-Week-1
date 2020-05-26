const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const resolution = 10;
canvas.width = 500;
canvas.height = 500;

const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

function createGrid() {
    return new Array(columns).fill(null)
      .map(() => new Array(rows).fill(null)
        .map(() => Math.floor(Math.random() * 2))); // randomly generates cells, either they'll be 0 or 1
  }

let grid = createGrid();

requestAnimationFrame(updateGrid);

console.log(grid)

function updateGrid() {
    grid = nextGeneration(grid);
    render(grid)
    requestAnimationFrame(updateGrid)
}

// We need a copy of the previous generation before iterating
function nextGeneration(grid) {
    const nextGen = grid.map(arr => [...arr]) //create copy of grid

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
          const cell = grid[col][row];
          let numNeighbors = 0;
          // loop through cell's neighbors
          for( let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                  if (i == 0 && j == 0) {
                      continue
                  }
                  const xCell = col + i;
                  const yCell = row + j

                  if (xCell >= 0 && yCell >= 0 && xCell < columns && yCell < rows) {
                    const currentNeighbor = grid[col + i][row + j];
                    numNeighbors += currentNeighbor;
                  }  
              }
          }

          //Apply rules of the game
          if (cell === 1 && numNeighbors < 2) {
              nextGen[col][row] = 0;
          } 
          else if (cell === 1 && numNeighbors > 3) {
              nextGen[col][row] = 0
          }
          else if (cell === 0 && numNeighbors === 3) {
            nextGen[col][row] = 1
        }
    }
}
        return nextGen
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
  
        context.beginPath();
        context.rect(col * resolution, row * resolution, resolution, resolution);
        context.fillStyle = cell ? 'black' : 'white';
        context.fill();
        context.stroke();
      }
    }
  }

