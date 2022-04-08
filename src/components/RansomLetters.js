import React, { useEffect } from 'react'
import GetLetter from './GetLetter';

const RansomLetters = ({props}) => {
  
  const { ransomWord } = props;

  const ransomLetters = ransomWord.split('')

  return (
    <div>
      {ransomLetters.map((letter, index) => {
        return <GetLetter key={index} props={letter}/>
      })}
    </div>
    
  )
}

export default RansomLetters