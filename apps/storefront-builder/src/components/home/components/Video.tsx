"use client";

interface VideoComponentProps {
  src: string; // Video source URL
  poster?: string; // Optional poster image
  autoplay?: boolean; // Auto-play the video
  controls?: boolean; // Show controls
  loop?: boolean; // Loop the video
  muted?: boolean; // Mute the video
  className?: string; // Optional class for styling
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  src,
  poster,
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  className = "",
}) => {
  return (
    <video src={src} poster={poster} autoPlay={autoplay} controls={controls} loop={loop} muted={muted} className={className}>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
