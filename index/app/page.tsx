'use client';

import { useState } from 'react';
import Head from 'next/head';

const MyopiaSimulator = () => {
  type SceneKey = 's' | 'r' | 'p';

  const [currentScene, setCurrentScene] = useState<SceneKey>('s');
  const [sliderValue, setSliderValue] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const sliderRange = Array.from({ length: 11 }, (_, i) => i);

  const handleSceneChange = (scene: SceneKey) => {
    setCurrentScene(scene);
  };

  const imagePrefix: Record<SceneKey, string> = {
    s: 'sim',
    r: 'road',
    p: 'play',
  };

  return (
    <>
      <Head>
        <title>Myopia Simulator</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#202427" />
        <meta
          name="description"
          content="Interactive myopia simulator with real-time visual feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="title">
          <img src="/assets/logo.png" className="titleImg" alt="Logo" />
        </h1>

        <div className="buttonGroup">
          <button
            className={`schoolBtn ${currentScene === 's' ? 'active' : ''}`}
            onClick={() => handleSceneChange('s')}
          >
            Classroom
          </button>
          <button
            className={`roadBtn ${currentScene === 'r' ? 'active' : ''}`}
            onClick={() => handleSceneChange('r')}
          >
            Road
          </button>
          <button
            className={`playBtn ${currentScene === 'p' ? 'active' : ''}`}
            onClick={() => handleSceneChange('p')}
          >
            Playground
          </button>
        </div>

        <div className="riskContainer">
          <p className="risk">
            Myopia Risk Level: {sliderValue !== 0 ? -Math.abs(sliderValue) : 0}.00D
          </p>
        </div>

        <div className="slideCon">
          <div className="sliderContainer">
            {showHint && <div className="sliderHint">Slide to start simulating</div>}

            <div className="sliderNumbers">
              {sliderRange.map((num) => (
                <span
                  key={num}
                  className={`number ${sliderValue === num ? 'active' : ''}`}
                >
                  {-num}
                </span>
              ))}
            </div>

            <input
              type="range"
              className="slider"
              min="0"
              max="10"
              value={sliderValue}
              onChange={(e) => {
                setSliderValue(parseInt(e.target.value));
                if (showHint) setShowHint(false);
              }}
            />
          </div>
        </div>

        {(['s', 'r', 'p'] as SceneKey[]).map((sceneKey) => (
          <div key={sceneKey} className="fullscreenImg">
            {sliderRange.map((val) => (
              <img
                key={`${sceneKey}${val}`}
                src={`/assets/${imagePrefix[sceneKey]}${val}.webp`}
                alt={`Myopia ${val}`}
                style={{
                  display:
                    currentScene === sceneKey && sliderValue === val ? 'block' : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyopiaSimulator;
