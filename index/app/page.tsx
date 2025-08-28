'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';


const MyopiaSimulator = () => {
  // Define all possible scene keys
  type SceneKey = 's' | 'r' | 'p' | 'a' | 'b' | 'd';

  // useState declarations:
  const [currentScene, setCurrentScene] = useState<SceneKey>('s');
  const [sliderValue, setSliderValue] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [isTablet, setIsTablet] = useState(false);

  // Array for slider ticks from 0 to 10
  const sliderRange = Array.from({ length: 11 }, (_, i) => i);

  // Map each scene key to the image prefix in /assets/
  const imagePrefix: Record<SceneKey, string> = {
    s: 'sim',
    r: 'road',
    p: 'play',
    a: 'alpha',
    b: 'beta',
    d: 'delta',
  };

  // Looks for screen width to handle scene chang from desktop to mobile
  useEffect(() => {
    const handleResize = () => {
      const tablet = window.innerWidth <= 800;
      setIsTablet(tablet);

      setCurrentScene((prev) => {
        if (tablet) {
          // Map desktop scenes to mobile scenes
          if (prev === 's') return 'a';
          if (prev === 'r') return 'b';
          if (prev === 'p') return 'd';
          return prev;
        } else {
          // Map mobile scenes back to desktop scenes
          if (prev === 'a') return 's';
          if (prev === 'b') return 'r';
          if (prev === 'd') return 'p';
          return prev;
        }
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler to change scene when a button is clicked.
  // It maps desktop scenes to mobile scenes when in mobile mode.
  const handleSceneChange = (scene: SceneKey) => {
    if (isTablet) {
      if (scene === 's') scene = 'a';
      if (scene === 'r') scene = 'b';
      if (scene === 'p') scene = 'd';
    }
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
        {/* Title section with logo */}
        <h1 className="title">
          <img src="/assets/logo.png" className="titleImg" alt="Logo" />
        </h1>


        {/* Hint text shown initially */}
            {showHint && <div className="hintContainer"><div className="sliderHint">Use the slider to show different amounts of blur caused by myopia</div></div>}

        {/* Scene selection buttons */}
        <div className="buttonGroup">

          {/* Classroom */}
          <button
            className={`schoolBtn ${
              currentScene === (isTablet ? 'a' : 's') ? 'active' : ''
            }`}
            onClick={() => handleSceneChange('s')}>
            SCHOOL
          </button>

             {/* Playground */}
          <button
            className={`playBtn ${
              currentScene === (isTablet ? 'd' : 'p') ? 'active' : ''
            }`}
            onClick={() => handleSceneChange('p')}
          >
            SPORT
          </button>

          {/* Road */}
          <button
            className={`roadBtn ${
              currentScene === (isTablet ? 'b' : 'r') ? 'active' : ''
            }`}
            onClick={() => handleSceneChange('r')}
          >
            STREET
          </button>

         
        </div>

        {/* Myopia risk level display */}
        <div className="riskContainer">
          <p className="risk">
            MYOPIA RISK LEVEL: {sliderValue !== 0 ? -Math.abs(sliderValue) : 0}.00D
          </p>
        </div>

        {/* Slider section */}
        <div className="slideCon">
          <div className="sliderContainer">

            

            {/* Slider numbers above the slider */}
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

            {/* Actual range input slider */}
            <input
              type="range"
              className="slider"
              min="0"
              max="10"
              value={sliderValue}
              onChange={(e) => {
                setSliderValue(parseInt(e.target.value));
                if (showHint) setShowHint(false); // Hide hint once user interacts
              }}
            />
          </div>
        </div>

        {/* Image display container */}
        {/* Loops through all scene keys and slider values, showing only
            the currently active scene and slider value image */}


        {(['s', 'r', 'p', 'a', 'b', 'd'] as SceneKey[]).map((sceneKey) => (
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



