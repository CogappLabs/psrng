import React from 'react'

const ManifestPanel = ({matchedManifests}) => {

  console.log(matchedManifests)

  return (
    <div>
      <h4>Matched manifests</h4>
      {matchedManifests.map((manifest, index) => {
        return <div key={index}>
            <p>{manifest.ransomWord}: <a href={`${manifest.manifestId}`}>{manifest.label}</a></p>
          </div>
      })}
    </div>
  )
}

export default ManifestPanel