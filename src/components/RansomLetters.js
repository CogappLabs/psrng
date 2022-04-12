import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RansomWord from './RansomWord';

const RansomLetters = ({letterToSearch, manifestData}) => {

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
            let imageURL = manifestImage[0]['images'][0]['resource']['@id']
            imageURL = imageURL.replace('full',generousImageCoords)
            return imageURL
          })
          letterMatchArray = [...letterMatchArray, ...letterResourceImages]
          setLetterMatches(letterMatchArray)
        } 
      }
      getData(manifest['searchURL'],letterToSearch)
      countdown -= 1
      if (countdown === 0) {
        setSearchComplete(true)
      }
    });
    
  },[letterToSearch])


  if(!searchComplete ){
    return null;
  }



  return (
    <div>
      {letterMatches !== undefined ? 
          <RansomWord imageURLs={letterMatches} ransomWord={letterToSearch} className='ransom-letters'/>
    :
    <div>
      {letterToSearch}
    </div>
    }

    </div>
  )
}

export default RansomLetters