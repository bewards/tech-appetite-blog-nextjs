const IFrameResponsive = ({ src }) => (
  <>
    <div style={({ display: 'flex' }, { justifyContent: 'center' })}>
      <iframe
        title="iframe video"
        style={{ aspectRatio: '16 / 9', width: '100% !important', border: 0 }}
        src={src}
      ></iframe>
    </div>
  </>
)
export default IFrameResponsive
