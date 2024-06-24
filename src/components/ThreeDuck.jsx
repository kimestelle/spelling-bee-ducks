import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ColorSphere from './ColorSelect';
import '../styles/ColorSelect.css'

const ThreeDuck = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log(color);
    alert(`Selected Color: ${color}`);
  };  

  return (
    <div style={{ height: '20svh', width: '20svh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ColorSphere onColorSelect={handleColorSelect} />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
      {selectedColor && (
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'black', background: 'white', padding: '5px' }}>
          Selected Color: {selectedColor}
        </div>
      )}
    </div>
  );
};

export default ThreeDuck;

