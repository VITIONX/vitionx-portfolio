
"use client";

type VideoItem = {
  src: string;
  alt: string;
};

type VideoGalleryProps = {
  videos: VideoItem[];
};

export default function VideoGallery({ videos }: VideoGalleryProps) {
  if (videos.length === 0) {
    return (
      <div className="portfolio-empty">
        <p>No videos available yet.</p>
        <span>New video projects will appear here soon.</span>
      </div>
    );
  }

  return (
    <div className="portfolio-gallery">
      {videos.map((video) => (
        <div className="portfolio-gallery-item" key={video.src}>
          <video
            src={video.src}
            controls
            preload="metadata"
            playsInline
            aria-label={video.alt}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
}
