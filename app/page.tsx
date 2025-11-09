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
    c: 'class',
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


 {showHint && (
  <div className="sliderHint">
    <svg
      preserveAspectRatio="xMidYMid slice"
      viewBox="10 10 80 80"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // behind the text
      }}
    >
      <style>
        {`
          @keyframes rotateOutTop { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes rotateInTop { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes rotateOutBottom { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes rotateInBottom { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

          .out-top-g { animation: rotateOutTop 40s linear infinite; transform-origin: 13px 25px; }
          .in-top-g { animation: rotateInTop 20s linear infinite; transform-origin: 13px 25px; }
          .out-bottom-g { animation: rotateOutBottom 50s linear infinite; transform-origin: 84px 93px; }
          .in-bottom-g { animation: rotateInBottom 30s linear infinite; transform-origin: 84px 93px; }
        `}
      </style>

      <g className="out-top-g">
        <path fill="var(--ani1)" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"/>
      </g>
      <g className="in-top-g">
        <path fill="var(--ani2)" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"/>
      </g>
      <g className="out-bottom-g">
        <path fill="var(--ani3)" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"/>
      </g>
      <g className="in-bottom-g">
        <path fill="var(--ani4)" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"/>
      </g>
    </svg>

     <span>
    <b className="main">Myopia Vision Simulator</b>
    <br />
    <hr />
    <div className="second">
      Drag the <b>slider</b> to show different amounts of blur caused by myopia
    </div>
  </span>

  <div className="credits">
    <div className="credit-text">Created By</div>
    <img src="assets/NCLogo.png" alt="NevadaCloud Logo" className="logo" />
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



{/*  
        <div className="slideCon">
          <div className="sliderContainer">
            

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

            {/* <div className="sliderNumbers">
              {sliderRange.map((num) => (
                <span
                  key={num}
                  className={`number ${sliderValue === num ? 'active' : ''}`}
                >
                  {-num}
                </span>
              ))}
            </div> 
          </div>
        </div> */}

         <div className="slideCon">
            {/* The risk element needs to be here, inside slideCon */}
            <p className="risk">
              <span className="riskLabel"><b>MYOPIA</b>&nbsp;RISK LEVEL </span>
              {sliderValue !== 0 ? -Math.abs(sliderValue) : 0}.00D
            </p>

            <div className="sliderContainer">
                    
            <input
              type="range"
              className="slider"
              min="0"
              max="10"
              step="1"
              value={sliderValue}
              onChange={(e) => {
                setSliderValue(parseInt(e.target.value));
                if (showHint) setShowHint(false);
              }}
            />


            {/* Dots at snapping points */}
            <div className="sliderDots">
              {Array.from({ length: (10 - 0) / 1 + 1 }).map((_, i) => (
                <span key={i} className={`dot ${i === sliderValue ? 'active' : ''}`} />
              ))}
            </div>
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
