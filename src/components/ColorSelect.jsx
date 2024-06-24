import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ColorSphere = ({ onColorSelect }) => {
  const sphereRef = useRef();
  const { gl, viewport } = useThree();
  const sphereRadius = viewport.height * 0.3;

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    // Fragment shader
    const fragmentShader = `
    varying vec2 vUv;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec3 color;

      // Convert UV coordinates to spherical coordinates
      float theta = vUv.y * 0.5 * 3.141592653589793; // Latitude (0 to Pi)
      float phi = vUv.x * 2.0 * 3.141592653589793; // Longitude (0 to 2Pi)

      // Calculate Cartesian coordinates
      float x = sin(theta) * cos(phi);
      float y = cos(theta);
      float z = sin(theta) * sin(phi);

     float brightness = smoothstep(0.0, 1.0, 1.0 - abs(cos(theta)));

    float hue = phi / (2.0 * 3.141592653589793); // Normalize phi to [0, 1]
      color = hsv2rgb(vec3(hue, 1.0, 1.0));
  
      color = mix(color, vec3(1.0), smoothstep(1.0, 0.0, brightness));


gl_FragColor = vec4(color, 1.0);
}
  `;


  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  // Rotate sphere on mouse drag
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.target.setPointerCapture(event.pointerId);
    const initialRotation = sphereRef.current.rotation.clone();
    const initialPosition = { x: event.clientX, y: event.clientY };

    const handlePointerMove = (event) => {
      const deltaX = event.clientX - initialPosition.x;
      const deltaY = event.clientY - initialPosition.y;
      sphereRef.current.rotation.y = initialRotation.y + deltaX * 0.01;
      sphereRef.current.rotation.x = initialRotation.x + deltaY * 0.01;
    };

    const handlePointerUp = (event) => {
      event.stopPropagation();
      event.target.releasePointerCapture(event.pointerId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Handle mouse click to get color
  const handlePointerClick = (event) => {
    event.stopPropagation();

    const canvas = gl.domElement;
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      console.error('Canvas element not found or invalid');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

   // error message here
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to retrieve canvas context');
      return;
    }

    const pixel = ctx.getImageData(x * canvas.width, y * canvas.height, 1, 1).data;
    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    if (onColorSelect) {
      onColorSelect(rgbColor);
    }
  };

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={sphereRef} onPointerDown={handlePointerDown} onClick={handlePointerClick}>
      <sphereGeometry args={[sphereRadius, 32, 32]} />
      <shaderMaterial attach="material" args={[material]} />
    </mesh>
  );
};

export default ColorSphere;
