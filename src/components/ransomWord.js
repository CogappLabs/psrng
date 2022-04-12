import React, { useEffect, useState } from 'react'


const RansomWord = ({imageURLs, ransomWord}) => {

  const [ image, setImage ] = useState('')

  useEffect(() => {
    setImage(imageURLs[Math.floor(Math.random() * imageURLs.length)])
  },[imageURLs])

  const handleRandomiser = () => {
    setImage(imageURLs[Math.floor(Math.random() * imageURLs.length)])
  }

  return (
    <div onClick={handleRandomiser} className='ransom-letters'>
      <img src={`${image}`} alt={`OCR of ${ransomWord}`} className='ransom-letter'/>
    </div>
  )
}

export default RansomWord