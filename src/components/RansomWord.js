import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaRedo } from 'react-icons/fa';


const RansomWord = ({imageMetadata, ransomWord, keyName, language, wordIndex }) => {

  const [ image, setImage ] = useState('')

  const { t, i18n } = useTranslation()

  useEffect(() => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
    i18n.changeLanguage(language)
  },[i18n, imageMetadata, language])

  const handleRandomiser = () => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
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
