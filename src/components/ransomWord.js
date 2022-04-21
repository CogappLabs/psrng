import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';


const RansomWord = ({imageMetadata, ransomWord, keyName, language }) => {

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
      <img src={`${image.imageURL}`} alt={`OCR of ${ransomWord}`} />
      { imageMetadata.length > 1 ?
        <div
          onClick={handleRandomiser}
          className='refresh'
        >{t('refresh')} "{ransomWord}"</div>
        :
        <div className='refresh'>This is the only image found for "{ransomWord}"</div>
      }
      {/* <p>{image.label}</p> */}
    </div>
  )
}

export default RansomWord