import { useRef, useState, useEffect, MouseEvent } from 'react';
import styles from './PaintApp.module.scss';

const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#353535");
  const [lineWidth, setLineWidth] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = Math.min((window.innerWidth - 100), 800);
      canvas.height = 500;
    }
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = Math.min((window.innerWidth - 100), 800);
      canvas.height = 500;

      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = isErasing ? "#FFFFFF" : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={styles.paintApp}>
      <div className={styles.toolbar}>
        <label htmlFor='color'>Color</label>
        <input className={styles.colorInput} id="color" name="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} disabled={isErasing} />
        <label htmlFor='width'>Line width</label>
        <input className={styles.widthInput} name="width" id="width" type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />
        <button className={styles.eraserButton} onClick={toggleEraser}>{isErasing ? "Stop Erasing" : "Eraser"}</button>
        <button className={styles.resetButton} onClick={clearCanvas}>Reset</button>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      ></canvas>
    </div>
  );
};

export default PaintApp;
