import Document, { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'
class MyDocument extends Document {
  render() {
    return (
      <Html lang={siteMetadata.language} className="scroll-smooth">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicons/apple-touch-icon.png?v=2"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png?v=2"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png?v=2"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest?v=2" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg?v=2" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
