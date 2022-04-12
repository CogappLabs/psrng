import { useState, useEffect } from 'react';

import { multilingualManifests } from './managed/iiifEndpoints'
import ManifestLoader from './components/ManifestLoader';

function App() {

  const [language, setLanguage] = useState('en')

  const availableLanguages = Object.keys(multilingualManifests);

  const handleLanguageSelection = (event) => {
    setLanguage(event.target.value)
  }

  return (
    <div className='app-body'>
      <div className='prsng-body'>
        <h1>Primary Source Ransom Note Generator</h1>
        <div>
          <h2>Select a language</h2>
          <select onChange={handleLanguageSelection} value={language}>
            {availableLanguages.map(lang => {
              return <option
              key={lang}
              value={lang}
              >
                {lang}
              </option>
            })}
          </select>
        </div>
      </div>
        <ManifestLoader language={language}/>
    </div>
  );
}

export default App;
