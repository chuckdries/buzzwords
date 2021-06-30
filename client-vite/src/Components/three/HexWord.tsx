import { SpringRef, useChain } from "@react-spring/three";
import { GroupProps } from "@react-three/fiber";
import React, { useRef } from "react";
import HexLetter from "./HexLetter";

interface HexWordProps {
  text: string;
  position?: [number, number, number];
}

const HexWord: React.FC<HexWordProps & GroupProps> = ({
  text,
  position,
  ...props
}) => {
  const chainArray = useRef([] as SpringRef[]);
  const attachChain = React.useCallback(
    (spring: SpringRef) => {
      chainArray.current.push(spring);
    },
    [chainArray]
  );
  useChain(chainArray.current);
  const characters = text.split("");
  const positionOffset = -1 * (((characters.length - 1) * 5.5) / 2);
  return (
    <group
      position={[
        position ? position[0] + positionOffset : positionOffset,
        position ? position[1] : 0,
        position ? position[2] : 0,
      ]}
      {...props}
    >
      {characters.map((character, index) => (
        <HexLetter
          attachChain={attachChain}
          letter={character}
          key={index}
          position={[index * 5.5, 0, 0]}
        />
      ))}
    </group>
  );
};

export default HexWord;
