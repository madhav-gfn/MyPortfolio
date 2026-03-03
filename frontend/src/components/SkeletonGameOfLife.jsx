import React, { useRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SkeletonGameOfLife = ({ onActiveChange }) => {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const animationIdRef = useRef(null);
  const gridRef = useRef([]);
  const lastTimeRef = useRef(0);
  const isRunningRef = useRef(false);

  const CELL_SIZE = 6;
  const BONE_COLOR = '#E3DAC9';
  const FPS_LIMIT = 15;

  const setupGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cols = Math.ceil(window.innerWidth / CELL_SIZE);
    const rows = Math.ceil(window.innerHeight / CELL_SIZE);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gridRef.current = {
      data: new Array(cols).fill(null).map(() => new Array(rows).fill(0)),
      cols,
      rows
    };
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { data, cols, rows } = gridRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BONE_COLOR;
    ctx.beginPath();

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (data[i][j] === 1) {
          ctx.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
    ctx.fill();
  };

  const computeNextGen = () => {
    const { data, cols, rows } = gridRef.current;
    const nextGen = data.map(arr => [...arr]);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let neighbors = 0;
        
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (x === 0 && y === 0) continue;

            const x_cell = i + x;
            const y_cell = j + y;

            if (x_cell >= 0 && x_cell < cols && y_cell >= 0 && y_cell < rows) {
              neighbors += data[x_cell][y_cell];
            }
          }
        }

        const cell = data[i][j];
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          nextGen[i][j] = 0;
        } else if (cell === 0 && neighbors === 3) {
          nextGen[i][j] = 1;
        }
      }
    }
    gridRef.current.data = nextGen;
  };

  const animate = (timestamp) => {
    if (!isRunningRef.current) return;

    const deltaTime = timestamp - lastTimeRef.current;
    const interval = 1000 / FPS_LIMIT;

    if (deltaTime > interval) {
      lastTimeRef.current = timestamp - (deltaTime % interval);
      drawGrid();
      computeNextGen();
    }

    animationIdRef.current = requestAnimationFrame(animate);
  };

  const spawnSkeleton = (e) => {
    if (!isRunningRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const col = Math.floor(mouseX / CELL_SIZE);
    const row = Math.floor(mouseY / CELL_SIZE);
    const { data, cols, rows } = gridRef.current;

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
          if(Math.random() > 0.3) {
            const nCol = col + i;
            const nRow = row + j;
            if (nCol >= 0 && nCol < cols && nRow >= 0 && nRow < rows) {
              data[nCol][nRow] = 1;
            }
          }
        }
      }
    }
    drawGrid();
  };

  const enableSimulation = () => {
    if (isRunningRef.current) return;
    
    setupGrid();
    isRunningRef.current = true;
    setIsActive(true);
    if (onActiveChange) onActiveChange(true);
    animate(0);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    toast(isMobile ? 'Try tapping on screen' : 'Try dragging cursor all over the screen', {
      duration: 4000,
      icon: '💀',
    });
  };

  const disableSimulation = () => {
    isRunningRef.current = false;
    setIsActive(false);
    if (onActiveChange) onActiveChange(false);
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isRunningRef.current) {
        setupGrid();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 left-4 z-[10001] flex gap-2">
        {!isActive ? (
          <button
            onClick={enableSimulation}
            className="cursor-target px-4 py-2 bg-gray-600 text-white rounded-lg font-medium shadow-lg transition-transform active:scale-95"
          >
            💀
          </button>
        ) : (
          <button
            onClick={disableSimulation}
            className="cursor-target px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-lg transition-transform active:scale-95"
          >
            Stop
          </button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full z-[10000] transition-opacity duration-500 ${
          isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onMouseMove={spawnSkeleton}
        style={{
          cursor: isActive ? "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" style=\"font-size:24px\"><text y=\"22\">💀</text></svg>'), auto" : 'default'
        }}
      />
    </>
  );
};

export default SkeletonGameOfLife;