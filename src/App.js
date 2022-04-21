import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { multilingualManifests } from './managed/iiifEndpoints'
import ManifestLoader from './components/ManifestLoader';

function App() {

  const [language, setLanguage] = useState('en')
  const { t, i18n } = useTranslation()

  const availableLanguages = Object.keys(multilingualManifests);

  const handleLanguageSelection = (event) => {
    setLanguage(event.target.value)
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div className='app-body'>
      <div className='prsng-body'>
        <h1>{t("title")}</h1>
        <div className='language-select'>
          <h3>{t("language-select")}</h3>
          <select onChange={handleLanguageSelection} value={language} className='language-option'>
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
