import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { multilingualManifests } from './managed/iiifEndpoints'
import ManifestLoader from './components/ManifestLoader';

function App() {

  const [language, setLanguage] = useState('en')
  const { t, i18n } = useTranslation()
  document.body.dir = i18n.dir()

  const  availableLanguages = Object.entries(multilingualManifests);

  const handleLanguageSelection = (event) => {
    setLanguage(event.target.id)
    i18n.changeLanguage(event.target.id)
  }

  return (
    <div className='app-body'>
      <div className='prsng-body'>
        <div className='language-select'>
          <h4>{t("language-select")}</h4>
          <div className='language-options'>
            {availableLanguages.map((lang) => {
              return <div
                className={`${lang[0] === language ? 'selected-lang' : 'not-selected'} language-option`}
                key={lang[0]}
                id={lang[0]}
                onClick={handleLanguageSelection} 
              >
                {lang[1]['label']}
              </div>
            })}
          </div>
        </div>
        <h1>{t("title")}</h1>
      </div>
        <ManifestLoader language={language}/>
    </div>
  );
}

export default App;
