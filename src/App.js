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

  const searchEndpoint = iiifEndpoints[0]['searchEndpoint']
  const catalogueIds = iiifEndpoints[0]['catalogueIds'][0]

  useEffect(() => {
    const wordToSearch = userInputWordsArray[[userInputWordsArray.length -1]]
    const getData = async() => {
      try {
        const { data } = await axios.get(`${searchEndpoint}${catalogueIds}?q=${wordToSearch}`);
        
        if (wordToSearch) {
          const resourceData = data['resources'].length > 0 ? data['resources'][Math.floor(Math.random() * data['resources'].length)] : null;
          const randomResource = {
            'ransomWord': wordToSearch,
            'resource' : resourceData
          }
          const wordSearchResult = [ ...ransomResults, randomResource ]
          setRansomResults(wordSearchResult)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  },[userInputWordsArray])

  const handleChange = (event) => {
    const userInput = event.target.value;
    setRansomNote(userInput);
    if(userInput[userInput.length -1] === ' ') {
      setUserInputWordsArray(userInput.split(' ').filter(input => input !== ''));
      
    }
  };

  const couldNotFindWord = ransomResults.filter(ransomResult => !ransomResult.resource)
  const couldFindWord = ransomResults.filter(ransomResult => ransomResult.resource)

  return (
    <div className="App">
      <div>
        <h1>Primary Source Ransom Note Generator</h1>
      </div>
    <div class='input'>
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
            <h3>{ransomResult.ransomWord}</h3>
            <RansomWord ransomData={ransomResult}/>
          </div>
        })}
        {couldNotFindWord.map(ransomResult => {
          return <div>
            <h3>{ransomResult.ransomWord}</h3>
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
  );
}

export default App;
