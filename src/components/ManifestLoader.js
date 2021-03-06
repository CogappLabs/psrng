import { useState, useEffect } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaTrashAlt } from 'react-icons/fa';

import { multilingualManifests } from '../managed/iiifEndpoints'
import WordSearch from './WordSearch';
import ManifestPanel from './ManifestPanel';


const ManifestLoader = ({language}) => {

  const { t, i18n } = useTranslation()

  const [selectedLanguageManifest, setSelectedLanguageManifest] = useState([])
  const [manifestData, setManifestData] = useState(null)
  const [ransomNote, setRansomNote] = useState('');
  const [userInputWordsArray, setUserInputWordsArray] = useState([]);
  const [ matchedManifests, setMatchedManifests ] = useState()

  useEffect(() => {
    setSelectedLanguageManifest(multilingualManifests[`${language}`]['manifests'])
    i18n.changeLanguage(language)
  }, [language, i18n])

  useEffect(() => {
    let manifestArray = []
    selectedLanguageManifest.forEach(manifestURL => {
      const getData = async () => {
        const { data } = await axios.get(manifestURL)
        const searchService = data['service'].filter(service => service['@context'].indexOf( 'http://iiif.io/api/search/' ) > -1)
        if (searchService.length > 0) {
          const manifestLabel = typeof data['label'] === 'string' ? data['label'] : data['label']['@value']
          const returnedManifestData = {
            'label': manifestLabel,
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

    if(!event.target.id) {
      console.log('No button')
      return null;
    }
    const ransomWord = event.target.id.split('_')[1]
    const ransomWordId = event.target.id.split('_')[0]
    const updatedUserInputWordsArray = userInputWordsArray.filter(userInput => userInput !== ransomWord)
    setUserInputWordsArray(updatedUserInputWordsArray)
    setRansomNote(updatedUserInputWordsArray.join(' '))

    const filterMatchedManifest = {...matchedManifests}
    if (filterMatchedManifest[event.target.id]){
      delete filterMatchedManifest[event.target.id]
    } else {
      const letterIdArray = ransomWord.split('').map(letter => `${ransomWordId}_${letter}`)
      letterIdArray.forEach(letterId => delete filterMatchedManifest[letterId])
    }
    setMatchedManifests(filterMatchedManifest)

  }

  const handleManifestLoad = (event) => {

    const ransomWordId = event.target.name.split('---')[0]
    
    const newMatchedManifest = {
        ransomWord : event.target.name.split('---')[0].split('_')[1],
        manifestId : event.target.name.split('---')[1],
        label : event.target.name.split('---')[2]
  

    }
    const newData = { ...matchedManifests, [ransomWordId]: newMatchedManifest}
    setMatchedManifests(newData)

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
          <div className='hint-container'>
            {ransomNote && 
              <p className='hint'>{t("input-hint")}</p>
            }
          </div>
        </form>
      </div>
      <div className='ransom-output'>
        <div className={language === 'ar' ? 'ransom-words arabic-rtl' : 'ransom-words'}>
          {userInputWordsArray.map((userInputWord,index) => {
            return <div 
                    className='ransom-word'
                    key={index}
                    onLoad={handleManifestLoad}
                  >
                  <div
                  id={`${index}_${userInputWord}`}
                  onClick={handleRemoveWord}
                  className='remove'
                  >
                    <FaTrashAlt 
                    className='icon'
                  />
                  </div>
                  < WordSearch 
                    wordToSearch={userInputWord} 
                    manifestData={manifestData}
                    language={language}
                    wordIndex={index}
                  />
                </div>
          })}
        </div>
        <div className='manifest-panel'>
        <h4>{t('matched-manifests')}</h4>
          { matchedManifests !== undefined &&
              <ManifestPanel matchedManifests={matchedManifests} />
          }
        </div>


      </div>
    </div>
  )
}

export default ManifestLoader