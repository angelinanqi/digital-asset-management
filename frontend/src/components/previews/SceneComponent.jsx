'use client';

import { useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender,
    onSceneReady, ...rest }) => {
    const reactCanvas = useRef(null);

    // Setting up basic engine and scene
    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        // Creating a new engine 
        const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);

        // Creating a new scene
        const scene = new Scene(engine, sceneOptions);

        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === 'function') onRender(scene);
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener('resize', resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener('reisze', resize);
            }
        };
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender,
        onSceneReady]);

    return <canvas ref={reactCanvas} {...rest} />
}