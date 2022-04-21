import React from 'react'

const ManifestPanel = ({matchedManifests}) => {

  const manifestData = Object.values(matchedManifests)

  return (
    <div>
      {manifestData.map((manifest, index) => {
        return <div key={index}>
            <p>{manifest.ransomWord}: <a href={`${manifest.manifestId}`}>{manifest.label}</a></p>
          </div>
      })}
    </div>
  )
}

export default ManifestPanel