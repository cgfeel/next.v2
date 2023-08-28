'use client'

type ImgLoaderProps = {
    src: string;
    width: number;
    quality?: number;
};

const myImageLoader: (props: ImgLoaderProps) => string = ({ src, width, quality }) => `https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/${src}?w=${width}&q=${quality || 75}`;

export default myImageLoader;

// Docs: https://techdocs.akamai.com/ivm/reference/test-images-on-demand
/*export default function akamaiLoader({ src, width, quality }) {
    return `https://example.com/${src}?imwidth=${width}`
}*/

// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
/*export default function cloudinaryLoader({ src, width, quality }) {
    const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
    return `https://example.com/${params.join(',')}${src}`
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(
    ','
  )}${src}`
}*/

// Docs: https://developers.cloudflare.com/images/url-format
/*export default function cloudflareLoader({ src, width, quality }) {
    const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
    return `https://example.com/cdn-cgi/image/${params.join(',')}/${src}`
}*/

// Docs: https://www.contentful.com/developers/docs/references/images-api/
/*export default function contentfulLoader({ src, width, quality }) {
    const url = new URL(`https://example.com${src}`)
    url.searchParams.set('fm', 'webp')
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', (quality || 75).toString())
    return url.href
}*/

// Docs: https://developer.fastly.com/reference/io/
/*export default function fastlyLoader({ src, width, quality }) {
    const url = new URL(`https://example.com${src}`)
    url.searchParams.set('auto', 'webp')
    url.searchParams.set('width', width.toString())
    url.searchParams.set('quality', (quality || 75).toString())
    return url.href
}*/

// Docs: https://docs.gumlet.com/reference/image-transform-size
/*export default function gumletLoader({ src, width, quality }) {
    const url = new URL(`https://example.com${src}`)
    url.searchParams.set('format', 'auto')
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', (quality || 75).toString())
    return url.href
}*/

// Docs: https://support.imageengine.io/hc/en-us/articles/360058880672-Directives
/*export default function imageengineLoader({ src, width, quality }) {
    const compression = 100 - (quality || 50)
    const params = [`w_${width}`, `cmpr_${compression}`)]
    return `https://example.com${src}?imgeng=/${params.join('/')`
}*/

// Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
/*export default function imgixLoader({ src, width, quality }) {
    const url = new URL(`https://example.com${src}`)
    const params = url.searchParams
    params.set('auto', params.getAll('auto').join(',') || 'format')
    params.set('fit', params.get('fit') || 'max')
    params.set('w', params.get('w') || width.toString())
    params.set('q', (quality || 50).toString())
    return url.href
}*/

// Docs: https://thumbor.readthedocs.io/en/latest/
/*export default function thumborLoader({ src, width, quality }) {
    const params = [`${width}x0`, `filters:quality(${quality || 75})`]
    return `https://example.com${params.join('/')}${src}`
}*/

// Docs: https://www.sanity.io/docs/image-urls
/*export default function sanityLoader({ src, width, quality }) {
    const prj = 'zp7mbokg'
    const dataset = 'production'
    const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}${src}`)
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'max')
    url.searchParams.set('w', width.toString())
    if (quality) {
      url.searchParams.set('q', quality.toString())
    }
    return url.href
}*/

// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
/*export default function supabaseLoader({ src, width, quality }) {
    const url = new URL(`https://example.com${src}`)
    url.searchParams.set('width', width.toString())
    url.searchParams.set('quality', (quality || 75).toString())
    return url.href
}*/