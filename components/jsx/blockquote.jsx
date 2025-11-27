const BlockQuote = ({ content, size = "medium" }) => (
  <>
    <blockquote className={`md__blockquote md__blockquote--${size}`} aria-live="polite">
      {content}
    </blockquote>
  </>
)
export default BlockQuote
