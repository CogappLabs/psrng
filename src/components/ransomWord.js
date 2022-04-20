import React, { useEffect, useState } from 'react'


const RansomWord = ({imageMetadata, ransomWord, keyName }) => {

  const [ image, setImage ] = useState('')

  useEffect(() => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
  },[imageMetadata])

  const handleRandomiser = () => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
  }

  return (
    <div className={`${keyName}`}>
      <img src={`${image.imageURL}`} alt={`OCR of ${ransomWord}`} />
      { imageMetadata.length > 1 ?
        <div
          onClick={handleRandomiser}
          className='refresh'
        >Refresh "{ransomWord}"</div>
        :
        <div className='refresh'>This is the only image found for "{ransomWord}"</div>
      }
      {/* <p>{image.label}</p> */}
    </div>
  )
}

export default RansomWord