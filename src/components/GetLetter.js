import React, { useEffect, useState } from 'react'
import { iiifEndpoints } from '../managed/iiifEndpoints';
import axios from 'axios';
import RansomWord from './RansomWord';

const GetLetter = ({props}) => {


  const [ letter, setLetter ] = useState()

  const searchEndpoint = iiifEndpoints[1]['searchEndpoint']
  const catalogueIds = iiifEndpoints[1]['catalogueIds'][0]

  console.log(`${searchEndpoint}${catalogueIds}iiif/search?q=${props}`)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${searchEndpoint}${catalogueIds}iiif/search?q=${props}`);
      console.log(data)
      const resourceData = data['resources'].length > 0 ? data['resources'][Math.floor(Math.random() * data['resources'].length)] : null;
      const randomResource = {
        'ransomWord': props,
        'resource' : resourceData,
        'catalogueId': catalogueIds,

      }
      setLetter(randomResource)
    }
    getData();
  },[])

  if(!letter) {
    return null
  }


  return (
    <div>
      { letter.resource ?
        <RansomWord ransomData={letter} />
        :
        <p>{letter.ransomWord}</p>
      }
      
    </div>
  )
}

export default GetLetter