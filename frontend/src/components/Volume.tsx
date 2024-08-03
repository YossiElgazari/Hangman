import { useEffect, useRef, useState } from "react";
import { tracks } from "./tracks";
import { useSettings } from "../hooks/useSettings";
import PlayLine from "./PlayLine";

const Volume = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVolumeOn, setIsVolumeOn] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() =>
    Math.floor(Math.random() * tracks.length)
  );
  const currentTrack = tracks[currentTrackIndex];
  const { settings } = useSettings();
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current && isUserInteracted) {
      audioRef.current.volume = settings.volume / 100;
      if (settings.volume === 0) {
        setIsVolumeOn(false);
      }
      audioRef.current.muted = !isVolumeOn;
      if (isVolumeOn) {
        audioRef.current.play().catch((e) => {
          console.error("Play error:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [settings.volume, isVolumeOn, currentTrack, isUserInteracted]);

  const handleVolumeToggle = () => {
    if (settings.volume === 0) {
      settings.volume = 50;
    }
    setIsVolumeOn(!isVolumeOn);
    setIsUserInteracted(true); // Mark user interaction
  };

  const handleTrackEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  return (
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop={false}
        autoPlay={false}
        onEnded={handleTrackEnded}
      />
      <div
        className="w-8 h-8 cursor-pointer hover:opacity-75 mr-2 "
        onClick={handleVolumeToggle}
      >
        {isVolumeOn ? (
          <svg
            id="speakeron"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip-speaker">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
            <g id="speaker" clipPath="url(#clip-speaker)">
              <g
                id="Group_3382"
                data-name="Group 3382"
                transform="translate(-416)"
              >
                <g id="Group_3375" data-name="Group_3375">
                  <g id="Group_3368" data-name="Group 3368">
                    <g id="Group_3367" data-name="Group_3367">
                      <g id="Group_3366" data-name="Group_3366">
                        <path
                          id="Path_4047"
                          data-name="Path_4047"
                          d="M433.313,31.875a1,1,0,0,1-.679-1.733c.339-1.042.8-5.993.8-14.142s-.461-13.1-.8-14.142a1,1,0,0,1,.679-1.733c.9,0,2.121,0,2.121,15.875S434.208,31.875,433.313,31.875Z"
                          fill="#344952"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Group_3371" data-name="Group_3371">
                    <g id="Group_3370" data-name="Group_3370">
                      <g id="Group_3369" data-name="Group_3369">
                        <path
                          id="Path_4048"
                          data-name="Path_4048"
                          d="M433.333,31.875c-5.4-.008-10.275-3.332-12.73-8.673a.994.994,0,0,1-.09-.379c-.083-2.157-.125-4.453-.125-6.823s.042-4.666.125-6.823a.994.994,0,0,1,.09-.379c2.455-5.341,7.325-8.665,12.711-8.673.906.016,2.12.037,2.12,15.875S434.22,31.859,433.333,31.875ZM422.5,22.544a12.234,12.234,0,0,0,10.205,7.313c.328-1.485.726-6.293.726-13.857s-.4-12.374-.726-13.858A12.231,12.231,0,0,0,422.5,9.456c-.076,2.073-.115,4.273-.115,6.544S422.427,20.471,422.5,22.544Z"
                          fill="#344952"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Group_3374" data-name="Group_3374">
                    <g id="Group_3373" data-name="Group_3373">
                      <g id="Group_3372" data-name="Group_3372">
                        <path
                          id="Path_4049"
                          data-name="Path_4049"
                          fill="#344952"
                          d="M421.512,23.784h-1.446a3.55,3.55,0,0,1-3.546-3.546V11.762a3.55,3.55,0,0,1,3.546-3.546h1.446a1,1,0,1,1,0,2h-1.446a1.548,1.548,0,0,0-1.546,1.546v8.476a1.548,1.548,0,0,0,1.546,1.546h1.446a1,1,0,0,1,0,2Z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_3378" data-name="Group_3378">
                  <g id="Group_3377" data-name="Group_3377">
                    <g id="Group_3376" data-name="Group_3376">
                      <path
                        id="Path_4050"
                        data-name="Path_4050"
                        d="M437.968,22.369a1,1,0,0,1-.517-1.857,6.5,6.5,0,0,0,0-11.149,1,1,0,1,1,1.031-1.714,8.5,8.5,0,0,1,0,14.577A.991.991,0,0,1,437.968,22.369Z"
                        fill="#344952"
                        className="speaker-line"
                      />
                    </g>
                  </g>
                </g>
                <g id="Group_3381" data-name="Group_3381">
                  <g id="Group_3380" data-name="Group_3380">
                    <g id="Group_3379" data-name="Group_3379">
                      <path
                        id="Path_4051"
                        data-name="Path_4051"
                        d="M441.477,25.879a1,1,0,0,1-.6-1.8,11.377,11.377,0,0,0,0-18.277,1,1,0,0,1,1.191-1.606,13.376,13.376,0,0,1,0,21.489A.99.99,0,0,1,441.477,25.879Z"
                        fill="#344952"
                        className="speaker-line"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            id="speakeroff"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip-speaker2">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
            <g clipPath="url(#clip-speaker2)">
              <g
                id="Group_3365"
                data-name="Group 3365"
                transform="translate(-468)"
              >
                <g id="Group_3347" data-name="Group 3347">
                  <g id="Group_3346" data-name="Group 3346">
                    <g id="Group_3345" data-name="Group 3345">
                      <path
                        id="Path_4041"
                        data-name="Path 4041"
                        d="M467.667,17.126"
                        fill="none"
                        stroke="#344952"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      />
                    </g>
                  </g>
                </g>
                <g id="Group_3358" data-name="Group 3358">
                  <g id="Group_3357" data-name="Group 3357">
                    <g id="Group_3350" data-name="Group 3350">
                      <g id="Group_3349" data-name="Group 3349">
                        <g id="Group_3348" data-name="Group 3348">
                          <path
                            id="Path_4042"
                            data-name="Path 4042"
                            d="M485.313,31.875a1,1,0,0,1-.679-1.733c.339-1.042.8-5.993.8-14.142s-.461-13.1-.8-14.142a1,1,0,0,1,.679-1.733c.9,0,2.121,0,2.121,15.875S486.208,31.875,485.313,31.875Z"
                            fill="#344952"
                          />
                        </g>
                      </g>
                    </g>
                    <g id="Group_3353" data-name="Group 3353">
                      <g id="Group_3352" data-name="Group 3352">
                        <g id="Group_3351" data-name="Group 3351">
                          <path
                            id="Path_4043"
                            data-name="Path 4043"
                            d="M485.333,31.875c-5.4-.008-10.275-3.332-12.73-8.673a.994.994,0,0,1-.09-.379c-.083-2.157-.125-4.453-.125-6.823s.042-4.666.125-6.823a.994.994,0,0,1,.09-.379c2.455-5.341,7.325-8.665,12.711-8.673.906.016,2.12.037,2.12,15.875S486.22,31.859,485.333,31.875ZM474.5,22.544a12.234,12.234,0,0,0,10.205,7.313c.328-1.485.726-6.293.726-13.857s-.4-12.374-.726-13.858A12.231,12.231,0,0,0,474.5,9.456c-.076,2.073-.115,4.273-.115,6.544S474.427,20.471,474.5,22.544Z"
                            fill="#344952"
                          />
                        </g>
                      </g>
                    </g>
                    <g id="Group_3356" data-name="Group 3356">
                      <g id="Group_3355" data-name="Group 3355">
                        <g id="Group_3354" data-name="Group 3354">
                          <path
                            id="Path_4044"
                            data-name="Path 4044"
                            d="M473.512,23.784h-1.446a3.55,3.55,0,0,1-3.546-3.546V11.762a3.55,3.55,0,0,1,3.546-3.546h1.446a1,1,0,1,1,0,2h-1.446a1.548,1.548,0,0,0-1.546,1.546v8.476a1.548,1.548,0,0,0,1.546,1.546h1.446a1,1,0,0,1,0,2Z"
                            fill="#344952"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_3361" data-name="Group 3361">
                  <g id="Group_3360" data-name="Group 3360">
                    <g id="Group_3359" data-name="Group 3359">
                      <path
                        id="Path_4045"
                        data-name="Path 4045"
                        d="M494.223,21.257A5.257,5.257,0,1,1,499.48,16,5.263,5.263,0,0,1,494.223,21.257Zm0-8.514A3.257,3.257,0,1,0,497.48,16,3.261,3.261,0,0,0,494.223,12.743Z"
                        fill="#344952"
                      />
                    </g>
                  </g>
                </g>
                <g id="Group_3364" data-name="Group 3364">
                  <g id="Group_3363" data-name="Group 3363">
                    <g id="Group_3362" data-name="Group 3362">
                      <path
                        id="Path_4046"
                        data-name="Path 4046"
                        d="M491.167,19.848a1,1,0,0,1-.682-1.731l6.168-5.753a1,1,0,0,1,1.364,1.463l-6.168,5.753A1,1,0,0,1,491.167,19.848Z"
                        fill="#344952"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
      <PlayLine title={currentTrack.title} isPlaying={isVolumeOn} />
    </div>
  );
};

export default Volume;
