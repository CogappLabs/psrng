import { useEffect, useState } from 'react';
import axios from 'axios';
import RansomWord from './RansomWord';
import RansomLetters from './RansomLetters';

const WordSearch = ({wordToSearch, manifestData}) => {

  const [ wordMatches, setWordMatches ] = useState()
  const [ searchComplete, setSearchComplete ] = useState(false)


  useEffect(() => {
    let countdown = manifestData.length;
    let wordMatchArray = []
    manifestData.forEach(manifest => {
      const getData = async() => {
        const { data } = await axios.get(`${manifest['searchURL']}?q=${wordToSearch}`)
        const wordResources =  data['resources']
        if(wordResources.length > 0) {
          const wordResourceImages = wordResources.map(resource => {
            const resourceCanvas = resource['on'].split('#')[0]
            const imageCoords = resource['on'].split('=')[1]
            const manifestImage = manifest['canvases'].filter(canvas => {
              return canvas['@id'] === resourceCanvas
            })
            let imageURL = manifestImage[0]['images'][0]['resource']['@id']
            imageURL = imageURL.replace('full',imageCoords)
            return imageURL
          })
          wordMatchArray = [...wordMatchArray, ...wordResourceImages]
          setWordMatches(wordMatchArray)
        } 
      }
      getData()
      countdown -= 1
      if (countdown === 0) {
        setSearchComplete(true)
      }
    });
    
    
  },[wordToSearch])

  if(!searchComplete ){
    return null;
  }

  return (
    <div>
      {wordMatches !== undefined ? 
          <RansomWord imageURLs={wordMatches} ransomWord={wordToSearch}/>
    :
    <div>
        {wordToSearch.split('').map(letter => {
          return <RansomLetters letter={letter} manifestData={manifestData}/>
        })}
    </div>
    }

    </div>
  )
}

export default WordSearch