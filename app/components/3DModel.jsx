
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { 
    GizmoHelper, 
    GizmoViewport, 
    Grid, 
    Stats, 
    OrbitControls, 
    Environment, 
    useGLTF, 
    useTexture, 
    Html, 
    useProgress, 
    Lightformer, 
    Float, 
    useAnimations, 
    useHelper,
    AdaptiveDpr,
    AdaptiveEvents,
    PivotControls,
    TransformControls,
    AsciiRenderer,
    CameraControls
  } from '@react-three/drei'
  
  function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta/2.5))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        rotation-y={Math.PI * 0.25}
        scale={clicked ? 1.5 : props.scale}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]}  />
        <meshStandardMaterial color={hovered ? 'hotpink' : props.color} />
      </mesh>
    )
  }
  
export default function Model({options, selectedVariant}){

    console.log(options)
    console.log('____________________________________________')

    function scaling(){
        let scale = 0;
        for (let i=0; i < options[1].values.length; i++){
            if(options[1].values[i] == selectedVariant.selectedOptions[1].value){
                scale = (i+1)/1.5;
                // console.log(scale)
                return scale;
            }
        }

    }

    //start importing the 3d model in here. 
    return (
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-15, -15, -15]} />
          <Box position={[0, 0, 0]} scale={scaling()} color={selectedVariant.selectedOptions[0].value}/>
          <OrbitControls />
        </Canvas>
      )
}