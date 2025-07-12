'use client';

import { useState, useEffect } from 'react';

const MyopiaSimulator = () => {
  const sliderNumbersRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

type SceneKey = 's' | 'r' | 'p';

  const [currentScene, setCurrentScene] = useState<SceneKey>('s');
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // Only scroll on mobile
    if (window.innerWidth > 600) return;
    const activeEl = numberRefs.current[sliderValue];
    if (activeEl && sliderNumbersRef.current) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [sliderValue]);

  const sliderRange = Array.from({ length: 11 }, (_, i) => i);

  const getThumbColor = (value: number): string => {
  if (value <= 2) return '#5ca6dc';
  if (value <= 4) return '#5ca6dc';
  if (value <= 6) return '#5ca6dc';
  if (value <= 8) return '#5ca6dc';
  return '#5ca6dc';
};


  useEffect(() => {
    document.documentElement.style.setProperty('--thumb-color', getThumbColor(sliderValue));
  }, [sliderValue]);

const handleSceneChange = (scene: 's' | 'r' | 'p') => {
    setCurrentScene(scene);
  };

const imagePrefix: Record<SceneKey, string> = {
  s: 'sim',
  r: 'road',
  p: 'play',
};


  return (
    <div>
      <h1 className="title">MYOPIA VISION SIMULATOR</h1>

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

      <div className="sliderContainer">
        <div className="sliderNumbers" ref={sliderNumbersRef}>
          {sliderRange.map((num) => (
            <span
              key={num}
              ref={el => { numberRefs.current[num] = el; }}
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
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
        />
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
  );
};

export default MyopiaSimulator;
