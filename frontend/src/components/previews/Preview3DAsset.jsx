'use client';

import React from 'react';
import { AppendSceneAsync, ArcRotateCamera, Color4, HemisphericLight, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders';
import SceneComponent from '@/components/previews/SceneComponent';

export default function Preview3DAsset({ assetURL, lightIntensity, wheelPrecision, rComponent,
    gComponent, bComponent, aComponent }) {

    // Prepare the overall scene
    const onSceneReady = async (scene) => {
        // Create and position the camera
        const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 4, Vector3.Zero(), scene);

        // Create a new canvas for the model
        const canvas = scene.getEngine().getRenderingCanvas();

        // Set the background color using Color3
        scene.clearColor = new Color4(rComponent, gComponent, bComponent, aComponent);

        // Attach the camera to canvas
        camera.attachControl(canvas, true);

        // Control the speed and sensitivity of model
        camera.wheelPrecision = wheelPrecision;

        // Create a light to illuminate the model
        const light = new HemisphericLight('light', new Vector3(5, 5, 5), scene);

        // Set the light intensity
        // Note: (0-10) is generally okay
        light.intensity = lightIntensity;

        // Using the asset url, append the model to the scene with camera and light
        await AppendSceneAsync(assetURL, scene);
    };

    return (
        <>
            {/* This section is used to adjust the canvas width and height */}
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                style={{
                    width: '65vw',
                    height: '70vh',
                    boxShadow: '0 0 20px rgba(49, 45, 45, 0.2)',
                    borderRadius: '20px',
                }}
                id='my-canvas'
            />
        </>
    );
}
