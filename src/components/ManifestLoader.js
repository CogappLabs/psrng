import { useState, useEffect } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { multilingualManifests } from '../managed/iiifEndpoints'
import WordSearch from './WordSearch';


const ManifestLoader = ({language}) => {

  const { t, i18n } = useTranslation()

  const [selectedLanguageManifest, setSelectedLanguageManifest] = useState([])
  const [manifestData, setManifestData] = useState(null)
  const [ransomNote, setRansomNote] = useState('');
  const [userInputWordsArray, setUserInputWordsArray] = useState([]);

  useEffect(() => {
    setSelectedLanguageManifest(multilingualManifests[`${language}`])
    i18n.changeLanguage(language)
  }, [language, i18n])

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


  const handleChange = (event) => {
    const userInput = event.target.value;
    const splitInput = userInput.split(' ').filter(input => input !== '')
    setRansomNote(userInput);
    if (userInput[userInput.length - 1] === ' ') {
      setUserInputWordsArray(splitInput);
    } 
  };

  const handleRemoveWord = (event) => {

    const updatedUserInputWordsArray = userInputWordsArray.filter(userInput => userInput !== event.target.id)
    setUserInputWordsArray(updatedUserInputWordsArray)
    setRansomNote(updatedUserInputWordsArray.join(' '))

  }

  if (!manifestData) {
    return null;
  }

  return (
    <div className='prsng-body'>
      <div className='demand'>
        <form>
          <div>
            <input
              className='input'
              placeholder={t("demands-input")}
              value={ransomNote}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className='ransom-output'>
        <div className='ransom-words'>
          {userInputWordsArray.map((userInputWord,index) => {
            return <div 
                    className='ransom-word'
                    key={index}
                  >
              <div
              id={userInputWord}
              onClick={handleRemoveWord}
              className='remove test'
              >
                {t("remove")} "{userInputWord}"
              </div>
              < WordSearch 
                wordToSearch={userInputWord} 
                manifestData={manifestData}
                language={language}
              />
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ManifestLoader