// Reserves space via the intrinsic aspect ratio so the player doesn't collapse
// before load and then jump on play. Pass width/height for non-16:9 (e.g. portrait
// screen recordings); use maxWidth to cap how large a tall video renders.
const VideoResponsive = ({ src, width = 16, height = 9, maxWidth = '100%' }) => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
    <video
      controls
      preload="metadata"
      muted
      playsInline
      style={{
        width: '100%',
        maxWidth,
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
        borderRadius: '0.5rem',
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)
export default VideoResponsive
