import React, { useEffect, useState } from 'react'
import { iiifEndpoints } from '../managed/iiifEndpoints';
import axios from 'axios';

const RansomWord = ({ransomData}) => {

  const { ransomWord, resource, catalogueId } = ransomData;
  const [ image, setImage ] = useState()

  const imageEndpoint = iiifEndpoints[1]['searchEndpoint']
  const OCRCanvas = resource['on'].split('#')[0]
  const manifestURl = `${imageEndpoint}${catalogueId}iiif/manifest`
  let imageDimensions = resource['on'].split('#')
  imageDimensions = imageDimensions[imageDimensions.length - 1].split('=')
  imageDimensions = imageDimensions[imageDimensions.length - 1].split(',')


  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(manifestURl)
      
      const canvasMatch = data['sequences'][0]['canvases'].filter(canvas => canvas['@id'] === OCRCanvas)
      const fullIMageUrl = canvasMatch[0]['images'][0]['resource']['@id'].split('.jp2')[0]

      const ransomImage = `${fullIMageUrl}.jp2/${imageDimensions[0]},${imageDimensions[1]},${imageDimensions[2]},${imageDimensions[3]}/full/0/default.jpg`
      console.log(ransomImage)
      setImage(ransomImage)

    }
    getData()
  },[])
  

  return (
    <div>
      <img src={`${image}`} alt={`OCR of ${ransomWord}`}/>  
    </div>
  )
}

export default RansomWord