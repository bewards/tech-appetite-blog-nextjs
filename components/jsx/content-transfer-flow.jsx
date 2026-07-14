const SKETCH_FONT = "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', 'Chalkboard SE', cursive"

const ContentTransferFlow = () => (
  <figure className="not-prose my-8">
    <svg
      viewBox="0 0 760 490"
      role="img"
      aria-label="Content Transfer flow: on the source, create then monitor then stream chunks; chunk bytes cross to the target where the chunk set is completed into a .raif in blob storage, then consumed into the target database, then done."
      className="mx-auto h-auto w-full max-w-3xl"
      style={{ fontFamily: SKETCH_FONT }}
    >
      <defs>
        {/* roughen strokes so boxes/arrows look hand-drawn */}
        <filter id="ctf-sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ---- shapes (wobbled) ---- */}
      <g filter="url(#ctf-sketch)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* lane divider */}
        <line
          x1="380"
          y1="18"
          x2="380"
          y2="470"
          strokeDasharray="6 8"
          className="stroke-gray-300 dark:stroke-gray-600"
        />

        {/* SOURCE boxes */}
        <g className="fill-sky-50 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400">
          <rect x="70" y="55" width="240" height="52" rx="9" />
          <rect x="70" y="140" width="240" height="52" rx="9" />
          <rect x="70" y="225" width="240" height="52" rx="9" />
        </g>

        {/* TARGET boxes */}
        <g className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400">
          <rect x="450" y="225" width="240" height="62" rx="9" />
          <rect x="450" y="320" width="240" height="52" rx="9" />
          <rect x="490" y="405" width="160" height="44" rx="22" />
        </g>

        {/* arrows (gray) */}
        <g className="fill-gray-400 stroke-gray-400 dark:fill-gray-500 dark:stroke-gray-500">
          {/* box1 -> box2 */}
          <line x1="190" y1="107" x2="190" y2="139" />
          <polygon points="190,142 185,133 195,133" stroke="none" />
          {/* box2 -> box3 */}
          <line x1="190" y1="192" x2="190" y2="224" />
          <polygon points="190,227 185,218 195,218" stroke="none" />
          {/* box3 -> box4 (cross the divider) */}
          <line x1="310" y1="251" x2="440" y2="256" />
          <polygon points="449,256 439,251 439,262" stroke="none" />
          {/* box4 -> box5 */}
          <line x1="570" y1="287" x2="570" y2="319" />
          <polygon points="570,322 565,313 575,313" stroke="none" />
          {/* box5 -> box6 */}
          <line x1="570" y1="372" x2="570" y2="404" />
          <polygon points="570,407 565,398 575,398" stroke="none" />
        </g>
      </g>

      {/* ---- text (crisp, not wobbled) ---- */}
      <g textAnchor="middle" className="fill-gray-800 dark:fill-gray-100">
        {/* lane headers */}
        <text x="190" y="34" fontSize="17" className="fill-sky-700 dark:fill-sky-300">
          SOURCE
        </text>
        <text x="190" y="49" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          (e.g. PROD)
        </text>
        <text x="570" y="34" fontSize="17" className="fill-emerald-700 dark:fill-emerald-300">
          TARGET
        </text>
        <text x="570" y="49" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          (e.g. UAT)
        </text>

        {/* SOURCE box labels */}
        <text x="190" y="77" fontSize="15">
          1 · Create
        </text>
        <text x="190" y="95" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          transfer op on source
        </text>
        <text x="190" y="162" fontSize="15">
          2 · Monitor
        </text>
        <text x="190" y="180" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          poll until Completed
        </text>
        <text x="190" y="247" fontSize="15">
          3 · Stream chunks
        </text>
        <text x="190" y="265" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          copy chunk-by-chunk
        </text>

        {/* crossing arrow label */}
        <text x="378" y="238" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          chunk bytes →
        </text>
        <text x="378" y="288" fontSize="10" className="fill-gray-400 dark:fill-gray-500">
          encrypted / compressed
        </text>

        {/* TARGET box labels */}
        <text x="570" y="251" fontSize="15">
          4 · Complete chunk set
        </text>
        <text x="570" y="271" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          .raif in blob storage
        </text>
        <text x="570" y="342" fontSize="15">
          5 · Consume
        </text>
        <text x="570" y="360" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          into target DB
        </text>
        <text x="570" y="433" fontSize="15" className="fill-emerald-700 dark:fill-emerald-300">
          6 · Done ✓
        </text>
      </g>
    </svg>
  </figure>
)

export default ContentTransferFlow
