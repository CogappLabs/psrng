import RansomWord from './components/ransomWord';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { iiifEndpoints } from './managed/iiifEndpoints'

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
          const randomResource = {
            'ransomWord': wordToSearch,
            'resource' : data['resources'][Math.floor(Math.random() * data['resources'].length)]
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

  return (
    <div className="App">
     <div>
       <input
        placeholder='Type your note...'
        value={ransomNote}
        onChange={handleChange}
        />
     </div>
     <div>
       {ransomResults.map(ransomResult => {
         return <div>
           <h3>{ransomResult.ransomWord}</h3>
           <RansomWord ransomData={ransomResult}/>
         </div>
       })}
     </div>

    </div>
  );
}

export default App;
