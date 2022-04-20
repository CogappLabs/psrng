import React, { useEffect, useState } from 'react'


const RansomWord = ({imageURLs, ransomWord, keyName }) => {

  const [ image, setImage ] = useState('')

  useEffect(() => {
    setImage(imageURLs[Math.floor(Math.random() * imageURLs.length)])
  },[imageURLs])

  const handleRandomiser = () => {
    setImage(imageURLs[Math.floor(Math.random() * imageURLs.length)])
  }

  return (
    <div className={`${keyName}`}>
      <img src={`${image}`} alt={`OCR of ${ransomWord}`} />
      { imageURLs.length > 1 ?
        <div
          onClick={handleRandomiser}
          className='refresh'
        >Refresh "{ransomWord}"</div>
        :
        <div className='refresh'>This is the only image found for "{ransomWord}"</div>
      }
    </div>
  )
}

export default RansomWord