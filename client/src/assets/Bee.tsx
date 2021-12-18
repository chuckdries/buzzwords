/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";

import { Group, Vector3 } from "three";
import {
  useSpring,
  useSpringRef,
  config as springConfig,
} from "@react-spring/core";
import { animated } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";

import bee from "../../assets/bee.gltf?url";
import { theme } from "../app/theme";

// TODO: remove materials from model so we don't load unnecessary data
export const Bee = (props: GroupProps) => {
  const viewport = useThree(({ viewport }) => viewport);
  const size = useThree(({ size }) => size);

  const aspect = size.width / viewport.getCurrentViewport().width;
  const group = useRef<Group>();
  const isDragging = useRef(false);

  const springRef = useSpringRef();
  const [rotateSpring, rotateSpringApi] = useSpring(() => ({
    x: 0,
    y: 0,
    config: springConfig.slow,
    ref: springRef,
  }));

  // @ts-ignore
  const { nodes } = useGLTF(bee);

  const bind = useGesture({
    onDrag: ({ down, delta: [mx, my] }) => {
        rotateSpringApi.set({
          x: (mx / aspect) + rotateSpring.x.get(),
        });
        isDragging.current = down;
    },
  });

  const [v] = useState(() => new Vector3());
  useFrame(({ clock }) => {
    if (group.current && !isDragging.current) {
      rotateSpringApi.set({
        x: rotateSpring.x.get() + .03,
      });
    }
    v.set(rotateSpring.y.get(), rotateSpring.x.get(), 0);
    const a = v.length();
    v.normalize();
    group.current.setRotationFromAxisAngle(v, a / 2);
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, Math.PI / 4, -Math.PI / 1.5]}>
        {/* @ts-ignore */}
        <mesh {...bind()} geometry={nodes.Bee_1.geometry}>
          <meshStandardMaterial color={theme.colors.primary} />
        </mesh>
        {/* @ts-ignore */}
        <mesh {...bind()} geometry={nodes.Bee_2.geometry}>
          <meshStandardMaterial color={theme.colors.darkbrown} />
        </mesh>
        {/* @ts-ignore */}
        <mesh {...bind()} geometry={nodes.Bee_3.geometry}>
          <meshStandardMaterial color="#dddddd" />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload(bee);
