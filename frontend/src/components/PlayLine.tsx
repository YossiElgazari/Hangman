import React from "react";

type PlayLineProps = {
  title: string;
  isPlaying: boolean;
};

const PlayLine = ({ title, isPlaying }: PlayLineProps) => {
  return (
    <div
      draggable={false}
      className={`play-line flex items-center justify-center bg-silver dark:bg-primary_dark50 bg-opacity-50 overflow-hidden whitespace-nowrap w-24 md:w-32 p-1 rounded-md transition-opacity duration-500 ${
        isPlaying ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`play-line-title  text-primary_dark dark:text-secondary_dark font-poppins leading-none flex-1 ${
          isPlaying ? "scrolling" : ""
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default PlayLine;
