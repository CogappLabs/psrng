export const iiifEndpoints = [
  {
    'name': 'Wellcome Collection',
    'catalogueIds' : ['b28047771'],
    'searchEndpoint': 'https://iiif.wellcomecollection.org/search/v0/',
    'imageEndpoint' : 'https://iiif.wellcomecollection.org/image/'
  },
  {
    'name': 'AGDA',
    'catalogueIds' : ['fo/371/109817/'],
    'searchEndpoint': 'https://www.agda.ae/en/catalogue/tna/',
    'imageEndpoint' : ''
  },
]

// https://www.agda.ae/en/catalogue/tna/fo/371/109817/iiif/manifest

export const multilingualManifests = {
  'ar' : [
    'https://www.agda.ae/en/catalogue/tna/fo/371/168903/iiif/manifest',
    'https://www.agda.ae/en/catalogue/tna/fo/93/137/iiif/manifest'
  ],
  'en' : [
    'https://www.agda.ae/en/catalogue/tna/fo/371/109817/iiif/manifest',
    'https://www.agda.ae/en/catalogue/tna/fo/371/168903/iiif/manifest',
    'https://www.agda.ae/en/catalogue/tna/fo/93/137/iiif/manifest'
  ]
} 