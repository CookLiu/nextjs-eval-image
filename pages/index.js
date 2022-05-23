import { getSortedImagesData } from '../lib/posts.js'
import { ImageList } from '../components/ImageList'
import Image from 'next/image'

export default function Home({
  allImageData
}) {
  return (
    <div>
      {allImageData && 
      <ul>
        {allImageData.map((image) => {
          return (
            <li>
              <a href={image.imagePath}>{image.id}</a>
            </li>
          )
        })}
      </ul>
    }
    </div>
  )
}

export const getStaticProps = async () => {
  const allImageData = getSortedImagesData()
  return {
    props: {
      allImageData
    }
  }
}