'use client'

// import siteMetadata from '@/data/siteMetadata'
import { useEffect } from 'react'

const ImageZoom = () => {
  useEffect(() => {
    const loadImageZoom = async () => {
      const imageZoom = await import('fast-image-zoom').then((mod) => mod.default)
      console.log('imageZoom', imageZoom)
      imageZoom({
        selector: `img[alt]:not([alt=""]):not([data-image-zoom-disabled])`,
      })
    }
    loadImageZoom()
  }, [])

  return <></>;
}

export default ImageZoom;
