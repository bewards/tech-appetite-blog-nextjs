const VideoResponsive = ({ src }) => (
  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
    <video
      style={{
        width: '100% !important',
        height: 'auto !important',
      }}
      controls
      preload="none"
      muted
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)
export default VideoResponsive
