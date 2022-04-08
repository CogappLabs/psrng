import RansomWord from './components/RansomWord';
import RansomLetters from './components/RansomLetters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { iiifEndpoints } from './managed/iiifEndpoints'
// import Mirador from './Mirador';

function App() {

  const [ ransomNote, setRansomNote ] = useState('');
  const [ userInputWordsArray, setUserInputWordsArray ] = useState([])
  const [ ransomResults, setRansomResults ] = useState([])
  const [ manifest, setManifest ] = useState('initial');

  const searchEndpoint = iiifEndpoints[1]['searchEndpoint']
  const catalogueIds = iiifEndpoints[1]['catalogueIds'][0]

  useEffect(() => {
    const wordToSearch = userInputWordsArray[[userInputWordsArray.length -1]]
    const getData = async() => {
      try {
        const { data } = await axios.get(`${searchEndpoint}${catalogueIds}iiif/search?q=${wordToSearch}`);
        
        if (wordToSearch) {
          const resourceData = data['resources'].length > 0 ? data['resources'][Math.floor(Math.random() * data['resources'].length)] : null;
          const randomResource = {
            'ransomWord': wordToSearch,
            'resource' : resourceData,
            'catalogueId': catalogueIds,
          }
          const wordSearchResult = [ ...ransomResults, randomResource ]
          setRansomResults(wordSearchResult)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  },[userInputWordsArray, manifest])

  const handleChange = (event) => {
    const userInput = event.target.value;
    setRansomNote(userInput);
    if(userInput[userInput.length -1] === ' ') {
      setUserInputWordsArray(userInput.split(' ').filter(input => input !== ''));
      
    }
  };

  const couldNotFindWord = ransomResults.filter(ransomResult => !ransomResult.resource)
  const couldFindWord = ransomResults.filter(ransomResult => ransomResult.resource)

  console.log(couldFindWord)

  return (
    <div className='app-body'>
      <div className="App">
        <div>
          <h1>Primary Source Ransom Note Generator</h1>
        </div>
      <div className='input'>
        <input
          placeholder='Enter your demands...'
          value={ransomNote}
          onChange={handleChange}
          />
      </div>
      { 
        <div>
          {couldFindWord.map(ransomResult => {
            return <div>
              <RansomWord ransomData={ransomResult}/>
            </div>
          })}
          {couldNotFindWord.map(ransomResult => {
            return <div>
              <RansomLetters props={ransomResult}/>
            </div>
          })}
        </div>

      }
      
      {/* <div style={{'position': 'relative'}}>
          <Mirador config={{
            id: "mirador", windows: [{
              loadedManifest: 'https://collections.maison-salins.fr/iiif/2/108217/manifest',
              defaultSearchQuery: 'nous'
            }],
          }} plugins={[]} />
        </div> */}
      </div>
    </div>
  );
}

export default App;
