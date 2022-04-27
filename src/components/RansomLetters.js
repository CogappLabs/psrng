import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RansomWord from './RansomWord';

const RansomLetters = ({letterToSearch, manifestData, language, wordIndex}) => {

  const [ letterMatches, setLetterMatches ] = useState()
  const [ searchComplete, setSearchComplete ] = useState(false)


  useEffect(() => {
    let countdown = manifestData.length;
    let letterMatchArray = []
    manifestData.forEach(manifest => {
      const getData = async(searchURL, stringToSearch) => {
        const { data } = await axios.get(`${searchURL}?q=${stringToSearch}`)
        const letterResources =  data['resources']
        if(letterResources.length > 0) {
          const letterResourceImages = letterResources.map(resource => {
            const resourceCanvas = resource['on'].split('#')[0]
            const imageCoords = resource['on'].split('=')[1].split(',')
            const generousImageCoords = imageCoords.map(coord => parseInt(coord) + 10).join(',')
            const manifestImage = manifest['canvases'].filter(canvas => {
              return canvas['@id'] === resourceCanvas
            })

            const  imageURL = `${manifestImage[0]['images'][0]['resource']['service']['@id']}/${generousImageCoords}/full/0/default.jpg`

            return {imageURL : imageURL,
              label: manifest['label'],
              manifestId: manifest['manifestId']
              }
          })
          letterMatchArray = [...letterMatchArray, ...letterResourceImages]
          
        }
        setLetterMatches(letterMatchArray)
      }
      getData(manifest['searchURL'],letterToSearch)
      countdown -= 1
      if (countdown === 0) {
        setSearchComplete(true)
      }
    });
    
  },[letterToSearch, manifestData])


  if(!searchComplete || letterMatches === undefined){
    return null;
  }



  return (
    <div>
      {letterMatches.length > 0 ? 
          <RansomWord 
            imageMetadata={letterMatches} 
            ransomWord={letterToSearch} 
            language={language}
            keyName={'letter'}
            wordIndex={wordIndex}
          />
    :
    <div>
      {letterToSearch}
    </div>
    }

    </div>
  )
}

export default RansomLetters