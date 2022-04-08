import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [ ransomNote, setRansomNote ] = useState('');
  const [ wordToSearch, setWordToSearch ] = useState('');
  const [ userInputWordsArray, setUserInputWordsArray ] = useState([])

  const iiifEndpoint = 'https://www.agda.ae/en/catalogue/tna/fco/8/3509/iiif/search?q='

  useEffect(() => {
    const getData = async() => {
      try {
        const { data } = await axios.get(`${iiifEndpoint}${wordToSearch}`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  },[wordToSearch])

  const handleChange = (event) => {
    const userInput = event.target.value;
    setRansomNote(userInput);
    if(userInput[userInput.length -1] === ' ') {
      setUserInputWordsArray(userInput.split(' '));
      const lastWord = userInputWordsArray[userInputWordsArray.length -2];
      setWordToSearch(lastWord);
    }
  };


  console.log(userInputWordsArray);


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
       {userInputWordsArray.map(userInput => {
         return <div>
            <p>{userInput}</p>
          </div>
       })}
     </div>

    </div>
  );
}

export default App;
