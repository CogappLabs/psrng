import React, { useEffect, useState } from 'react'
import { iiifEndpoints } from '../managed/iiifEndpoints';
import axios from 'axios';
import RansomWord from './RansomWord';

const GetLetter = ({props}) => {


  const [ letter, setLetter ] = useState()

  const searchEndpoint = iiifEndpoints[0]['searchEndpoint']
  const catalogueIds = iiifEndpoints[0]['catalogueIds'][0]

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${searchEndpoint}${catalogueIds}?q=${props}`);
      console.log(data)
      const resourceData = data['resources'].length > 0 ? data['resources'][Math.floor(Math.random() * data['resources'].length)] : null;
      const randomResource = {
        'ransomWord': props,
        'resource' : resourceData
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
      <RansomWord ransomData={letter} />
    </div>
  )
}

export default GetLetter