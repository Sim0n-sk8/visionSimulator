'use client';

import { useState } from 'react';
import Head from 'next/head';

const MyopiaSimulator = () => {
  type SceneKey = 'c' | 's' | 'o';

  const [currentScene, setCurrentScene] = useState<SceneKey>('c');
  const [sliderValue, setSliderValue] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const sliderRange = Array.from({ length: 11 }, (_, i) => i);

  const imagePrefix: Record<SceneKey, string> = {
    c: 'sim',
    s: 'street',
    o: 'outdoor',
  };

  const handleSceneChange = (scene: SceneKey) => {
    setCurrentScene(scene);
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

        {showHint && (
          <div className="hintContainer">
            <div className="sliderHint">
              Use the slider to show different amounts of blur caused by myopia
            </div>
          </div>
        )}

        <div className="buttonGroup">
          <button
            className={`schoolBtn ${currentScene === 'c' ? 'active' : ''}`}
            onClick={() => handleSceneChange('c')}
          >
            SCHOOL
          </button>

          <button
            className={`playBtn ${currentScene === 'o' ? 'active' : ''}`}
            onClick={() => handleSceneChange('o')}
          >
            SPORT
          </button>

          <button
            className={`roadBtn ${currentScene === 's' ? 'active' : ''}`}
            onClick={() => handleSceneChange('s')}
          >
            STREET
          </button>
        </div>

        <div className="riskContainer">
          <p className="risk">
            MYOPIA RISK LEVEL: {sliderValue !== 0 ? -Math.abs(sliderValue) : 0}.00D
          </p>
        </div>

        <div className="slideCon">
          <div className="sliderContainer">
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

        {/* Correct image rendering for sliding */}
        {(['c', 's', 'o'] as SceneKey[]).map((sceneKey) => (
          <div key={sceneKey} className="fullscreenImg">
            {sliderRange.map((val) => (
              <img
                key={`${sceneKey}${val}`}
                src={`/assets/${imagePrefix[sceneKey]}${val}.jpg`}
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
