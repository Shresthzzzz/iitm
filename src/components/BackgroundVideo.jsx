import { MuxBackgroundVideo } from "@mux/mux-background-video/react";

function BackgroundVideo() {
  return (
    <div className="background-video">
      <MuxBackgroundVideo
        src="https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8"
        maxResolution="720p"
      />

      <div className="background-video-overlay" />
    </div>
  );
}

export default BackgroundVideo;