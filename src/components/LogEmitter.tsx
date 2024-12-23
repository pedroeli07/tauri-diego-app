    // src/components/LogEmitter.tsx
    import React, { useEffect } from "react";
    import { useFrame } from "@react-three/fiber";
    import { Text } from "@react-three/drei";

    interface LogEmitterProps {
    logs: string[];
    }

    const LogEmitter: React.FC<LogEmitterProps> = ({ logs }) => {
    return (
        <>
        {logs.map((log, index) => (
            <Text
            key={index}
            position={[0, 1.5 + index * 0.3, 0]}
            fontSize={0.2}
            color="#00CED1"
            anchorX="center"
            anchorY="middle"
            // Animação de ascensão
            onUpdate={(self) => {
                self.position.y += 0.01;
                if (self.position.y > 3) {
                self.visible = false;
                }
            }}
            >
            {log}
            </Text>
        ))}
        </>
    );
    };

    export default LogEmitter;
