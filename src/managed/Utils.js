// import axios from "axios";

// export const searchManifestsForMatch = async (stringToMatch, manifestData) => {
//   console.log(stringToMatch, manifestData)
//     let wordMatchArray = []
//     manifestData.forEach(manifest => {
//       const getData = async() => {
//         const { data } = await axios.get(`${manifest['searchURL']}?q=${stringToMatch}`)
//         const wordResources =  data['resources']
//         // console.log(wordResources)
//         // if(wordResources.length > 0) {
//         //   const wordResourceImages = wordResources.map(resource => {
//         //     const resourceCanvas = resource['on'].split('#')[0]
//         //     const imageCoords = resource['on'].split('=')[1]
//         //     const manifestImage = manifest['canvases'].filter(canvas => {
//         //       return canvas['@id'] === resourceCanvas
//         //     })
//         //     let imageURL = manifestImage[0]['images'][0]['resource']['@id']
//         //     imageURL = imageURL.replace('full',imageCoords)
//         //     return imageURL
//         //   })
//         //   wordMatchArray = [...wordMatchArray, ...wordResourceImages]
//         // } 
//       }
//       getData()
//       return 'blah'
//     });
// };

// async function searchManifest(stringToMatch) {
//   const getData = async() => {
//     const { data } = await axios.get(`https://www.agda.ae/en/catalogue/tna/fco/8/3509/iiif/search?q=${stringToMatch}`)
//     console.log('DATA: ',data)  
//   }
//   const data = getData()
//   return `String to match: ${data}`
// }

// export { searchManifest }