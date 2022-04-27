import React, { useEffect, useState } from 'react'
import { FaRedo } from 'react-icons/fa';


const RansomWord = ({imageMetadata, ransomWord, keyName, wordIndex }) => {

  const [ image, setImage ] = useState('')

  useEffect(() => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
  },[imageMetadata])

  const handleRandomiser = () => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
  }

  if(!image) {
    return null;
  }


  return (
    <div className={`${keyName}`}>
      <img src={`${image.imageURL}`} alt={`OCR of ${ransomWord}`} name={`${wordIndex}_${ransomWord}---${image.manifestId}---${image.label}`}/>
      { imageMetadata.length > 1 ?
        <div
          onClick={handleRandomiser}
          className='refresh'
        ><FaRedo /></div>
        :
        <div className='refresh'>This is the only image found for "{ransomWord}"</div>
      }
    </div>
  )
}

export default RansomWord
