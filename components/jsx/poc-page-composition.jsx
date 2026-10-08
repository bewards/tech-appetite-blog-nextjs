const SKETCH_FONT = "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', 'Chalkboard SE', cursive"

const PocPageComposition = () => (
  <figure className="not-prose my-8">
    <svg
      viewBox="0 0 760 425"
      role="img"
      aria-label="POC page composition: the header and footer placeholders are borrowed from a real Sitecore page, while the main area is replaced with your own POC React components. The page lives at /poc/card-playground on DEV, QA and UAT only."
      className="mx-auto h-auto w-full max-w-3xl"
      style={{ fontFamily: SKETCH_FONT }}
    >
      <defs>
        {/* roughen strokes so boxes/arrows look hand-drawn */}
        <filter id="ppc-sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* ---- shapes (wobbled) ---- */}
      <g filter="url(#ppc-sketch)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* URL bar */}
        <rect
          x="40"
          y="12"
          width="480"
          height="26"
          rx="13"
          className="fill-gray-50 stroke-gray-400 dark:fill-gray-900 dark:stroke-gray-500"
        />

        {/* borrowed from Sitecore: header + footer */}
        <g className="fill-sky-50 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400">
          <rect x="40" y="55" width="480" height="70" rx="9" />
          <rect x="40" y="315" width="480" height="60" rx="9" />
        </g>

        {/* your POC: main area */}
        <rect
          x="40"
          y="145"
          width="480"
          height="150"
          rx="9"
          className="fill-amber-50 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400"
        />

        {/* annotation arrows */}
        <g className="fill-gray-400 stroke-gray-400 dark:fill-gray-500 dark:stroke-gray-500">
          <line x1="592" y1="90" x2="533" y2="90" />
          <polygon points="524,90 534,85 534,95" stroke="none" />
          <line x1="592" y1="220" x2="533" y2="220" />
          <polygon points="524,220 534,215 534,225" stroke="none" />
          <line x1="592" y1="345" x2="533" y2="345" />
          <polygon points="524,345 534,340 534,350" stroke="none" />
        </g>
      </g>

      {/* ---- text (crisp, not wobbled) ---- */}
      <g textAnchor="middle" className="fill-gray-800 dark:fill-gray-100">
        {/* URL */}
        <text x="280" y="30" fontSize="12" className="fill-gray-500 dark:fill-gray-400">
          dev.my-site.com/poc/card-playground
        </text>

        {/* header */}
        <text x="280" y="85" fontSize="16">
          headless-header
        </text>
        <text x="280" y="107" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          real nav · logo · search · styles · dictionary
        </text>

        {/* main */}
        <text x="280" y="198" fontSize="16">
          mainReplacementChildren
        </text>
        <text x="280" y="225" fontSize="14" className="fill-amber-700 dark:fill-amber-300">
          {'<CardPlayground />'}
        </text>
        <text x="280" y="260" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          no templates · no renderings · no datasources · no publishing
        </text>

        {/* footer */}
        <text x="280" y="342" fontSize="16">
          headless-footer
        </text>
        <text x="280" y="362" fontSize="11" className="fill-gray-500 dark:fill-gray-400">
          real links · legal · social
        </text>

        {/* annotations */}
        <g className="fill-sky-700 dark:fill-sky-300" fontSize="14">
          <text x="665" y="86">
            borrowed from
          </text>
          <text x="665" y="103">
            Sitecore
          </text>
          <text x="665" y="341">
            borrowed from
          </text>
          <text x="665" y="358">
            Sitecore
          </text>
        </g>
        <g className="fill-amber-700 dark:fill-amber-300" fontSize="14">
          <text x="665" y="216">
            your POC
          </text>
          <text x="665" y="233">
            React code
          </text>
        </g>

        {/* caption */}
        <text x="280" y="408" fontSize="13" className="fill-gray-500 dark:fill-gray-400">
          routable on DEV · QA · UAT — absent from PROD
        </text>
      </g>
    </svg>
  </figure>
)

export default PocPageComposition
