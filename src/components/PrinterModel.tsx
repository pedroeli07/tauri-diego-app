import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from '@react-three/fiber';
import { BoxGeometry, ConeGeometry, CylinderGeometry } from 'three';

// Extenda o namespace do React Three Fiber com os nomes atualizados
extend({ BoxGeometry, ConeGeometry, CylinderGeometry });

const PrinterModel = () => {
  // UseRef com o tipo correto
  const groupRef = useRef<THREE.Group>(null!);

  // Animação simples de rotação
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base da Impressora */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Corpo da Impressora */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Extrusora */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
      {/* Emissor de Logs */}
      <mesh position={[0, 1.25, 0]}>
        <coneGeometry args={[0.2, 0.5, 32]} />
        <meshStandardMaterial color="#00CED1" />
      </mesh>
    </group>
  );
};

export default PrinterModel;
