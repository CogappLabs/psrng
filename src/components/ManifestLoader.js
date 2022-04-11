import { useState, useEffect } from 'react'
import axios from 'axios';

import { multilingualManifests } from '../managed/iiifEndpoints'
import WordSearch from './WordSearch';


const ManifestLoader = () => {

  const [language, setLanguage] = useState('en')
  const [selectedLanguageManifest, setSelectedLanguageManifest] = useState([])
  const [manifestData, setManifestData] = useState(null)
  const [ransomNote, setRansomNote] = useState('');
  const [userInputWordsArray, setUserInputWordsArray] = useState([]);

  const availableLanguages = Object.keys(multilingualManifests);

  useEffect(() => {

    setSelectedLanguageManifest(multilingualManifests[`${language}`])
  }, [language])

  useEffect(() => {
    let manifestArray = []
    selectedLanguageManifest.forEach(manifestURL => {
      const getData = async () => {
        const { data } = await axios.get(manifestURL)
        const searchService = data['service'].filter(service => service['@context'] === 'http://iiif.io/api/search/1/context.json')
        if (searchService.length > 0) {
          const returnedManifestData = {
            'label': data['label']['@value'],
            'manifestId': data['@id'],
            'canvases': data['sequences'][0]['canvases'],
            'searchURL': searchService[0]['@id']
          }
          manifestArray.push(returnedManifestData)
        }
      }
      getData();
    })
    setManifestData(manifestArray)

  }, [selectedLanguageManifest])

  const handleLanguageSelection = (event) => {
    setLanguage(event.target.value)
  }

  const handleChange = (event) => {
    const userInput = event.target.value;
    setRansomNote(userInput);
    if (userInput[userInput.length - 1] === ' ') {
      setUserInputWordsArray(userInput.split(' ').filter(input => input !== ''));

    }
  };

  if (!manifestData) {
    return null;
  }

  return (
    <div>
      <div>
        <form>
          <div>
            <select onChange={handleLanguageSelection}>
              {availableLanguages.map((availableLanguage, index) => {
                return <option
                  key={index}
                  value={availableLanguage}
                >
                  {availableLanguage}
                </option>
              })}
            </select>
          </div>
          <div>
            <input
              className='input'
              placeholder='Enter your demands...'
              value={ransomNote}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div>
        <div>
          {userInputWordsArray.map(userInputWord => {
            return <div>
              <h4>{userInputWord}</h4>
            </div>
          })}
        </div>
        <div>
          {userInputWordsArray.map(userInputWord => {
            return <div>
              <WordSearch wordToSearch={userInputWord} manifestData={manifestData} />
            </div>
          })}
        </div>
      </div>
      {/* <div>
        <h3>Manifests:</h3>
        {manifestData.map = (manifest => {
          console.log('hello')
          return <div>
              <p>{manifest.label}</p>
            </div>
        })}
      </div> */}


    </div>
  )
}

export default ManifestLoader