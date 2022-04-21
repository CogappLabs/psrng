import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import InfoCard from './InfoCard';


const RansomWord = ({imageMetadata, ransomWord, keyName, language }) => {

  const [ image, setImage ] = useState('')
  const [ showInfo, setShowInfo ] = useState(false)

  const { t, i18n } = useTranslation()

  useEffect(() => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
    i18n.changeLanguage(language)
  },[i18n, imageMetadata, language])

  const handleRandomiser = () => {
    setImage(imageMetadata[Math.floor(Math.random() * imageMetadata.length)])
  }

  const handleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={`${keyName}`}>
      <img src={`${image.imageURL}`} alt={`OCR of ${ransomWord}`} name={`${ransomWord}---${image.manifestId}---${image.label}`}/>
      { imageMetadata.length > 1 ?
        <div
          onClick={handleRandomiser}
          className='refresh'
        >{t('refresh')} "{ransomWord}"</div>
        :
        <div className='refresh'>This is the only image found for "{ransomWord}"</div>
      }
        { showInfo ?
        <div
          onClick={handleInfo}
        >
          <InfoCard />
        </div>
        :
        <div
          onClick={handleInfo}
        >
          <p>Info</p>
        </div>
      }
    </div>
  )
}

export default RansomWord
