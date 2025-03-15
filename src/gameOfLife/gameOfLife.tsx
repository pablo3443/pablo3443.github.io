import { useState, useEffect, useRef } from 'react';
import styles from './gameOfLife.module.scss';

const numRows = 15;
const numCols = 30;
const initialSpeed = 500;

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () => Array(numCols).fill(0));
};

const generateRandomGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
};

const getNextGeneration = (grid: number[][]) => {
  const newGrid = generateEmptyGrid();
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let neighbors = 0;
      directions.forEach(([dx, dy]) => {
        const nr = r + dx, nc = c + dy;
        if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols) {
          neighbors += grid[nr][nc];
        }
      });

      if (grid[r][c] === 1) {
        newGrid[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[r][c] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  return newGrid;
};

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState(generateRandomGrid);
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [elementSize, setElementSize] = useState<number>(window.innerWidth < 600 ? 10 : 15)
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!running) {
        clearInterval(intervalRef.current);
        return
    }

    intervalRef.current = setInterval(() => {
        setGrid(prevGrid => getNextGeneration(prevGrid));
    }, Math.round(100000 / speed));

    return () => clearInterval(intervalRef.current);

  }, [running, speed])

  const resizeGrid = () => {
    clearInterval(intervalRef.current)
    setGrid(generateEmptyGrid())
    setElementSize(window.innerWidth < 600 ? 10 : 15)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeGrid);

    return () => {
      window.removeEventListener('resize', resizeGrid);
    };
  }, []);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.grid} style={{
        gridTemplateColumns: `repeat(${numCols}, ${elementSize}px)`,
        height: `${numRows * elementSize}px`
      }}>
        {grid.map((rows, i) =>
          rows.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={cell ? styles.alive : styles.dead}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[i][j] = grid[i][j] ? 0 : 1;
                setGrid([...newGrid]);
              }}
            />
          ))
        )}
      </div>
      <div className={styles.controls}>
        <button className={running ? styles.pauseButton: styles.startButton} onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>
        <button className={styles.randomButton} onClick={() => setGrid(generateRandomGrid())}>
          Random
        </button>
        <button className={styles.resetButton} onClick={() => {
            setRunning(false)
            setGrid(generateEmptyGrid())
        }}>
          Reset
        </button>
        <label htmlFor="speed">Speed</label>
        <input className={styles.speedInput} id="speed" name="speed" type="range" min="100" max="1000" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
      </div>
    </div>
  );
};

export default GameOfLife;