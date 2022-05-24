import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const imagesDirectory = path.join(process.cwd(), 'public/images')
const txtDirectory = path.join(process.cwd(), 'public/txts')

export function getSortedImagesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(imagesDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\..*$/, '')

    // Read markdown file as string
    const fullPath = path.join(imagesDirectory, fileName)
    const imagePath = path.join('/images/', id)

    // Combine the data with the id
    return {
      id,
      imagePath
    }
  })
  // Sort posts by id
  return allPostsData.sort(({ id: a }, { id: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllImageIds() {
  const fileNames = fs.readdirSync(imagesDirectory)

  const allFiles = fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\..*$/, ''),
        fileName: fileName
      }
    }
  })
  // Sort posts by id
  return allFiles.sort(({ id: a }, { id: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export async function getImageData(id) {
  const allFiles = getAllImageIds()
  const algoText = getAlgoData(id)
  const mIndex = allFiles.findIndex(e => e.params.id === id)
  const content = (await algoText).contentHtml
  if (mIndex + 1 < allFiles.length) {
    const next_id = allFiles[mIndex + 1].params.id

    return {
      id, 
      next_id,
      content,
    }
  } else {
    return {
      id, 
      undefined,
      content,
    }
  }
}

export async function getAlgoData(id) {
  const fullPath = path.join(txtDirectory, `${id}.txt`)
  let contentHtml = ''
  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    contentHtml = processedContent.toString()
  }

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
  }
}
