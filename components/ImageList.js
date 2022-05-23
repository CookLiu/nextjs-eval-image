import * as React from 'react'

export default function ImageList({
  allImageData
}) {
  if (!allImageData || allImageData.length === 0) return null

  return (
    <>
      {allImageData.map((image) => {
        return (
          <div>
            <img
              src={postData.path}
              border="0" usemap="#planetmap"
              alt={postData.id} />

          </div>
        )
      })}
    </>
  )
}
