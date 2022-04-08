import React from 'react'
import { iiifEndpoints } from '../managed/iiifEndpoints';

const RansomWord = ({ransomData}) => {

  const { ransomWord, resource } = ransomData;

  const imageEndpoint = iiifEndpoints[0]['imageEndpoint']
  const imageInfo = resource['@id'].split('/')
  const imageId = imageInfo[imageInfo.length - 2]
  let imageDimensions = imageInfo[imageInfo.length - 1]
  imageDimensions = imageDimensions.split('r')
  imageDimensions = imageDimensions[imageDimensions.length - 1].split(',')
  

  // https://iiif.wellcomecollection.org/image/b28047771_0022.jp2/481,2625,227,44/full/0/default.jpg
  const ransomImage = `${imageEndpoint}${imageId}/${imageDimensions[0]},${imageDimensions[1]},${imageDimensions[2]},${imageDimensions[3]}/full/0/default.jpg`

  console.log(ransomImage)

  return (
    <div>
      <img src={`${ransomImage}`} alt={`OCR of ${ransomWord}`}/>  
    </div>
  )
}

export default RansomWord