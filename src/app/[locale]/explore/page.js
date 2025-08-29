import { getLocale } from '../../../lib/locale'
import { getDictionary } from '../../../lib/transilation'
import React from 'react'
import ExploreClient from './ExploreClient'

export default async function ExplorePage() {
  const locale = await getLocale()
  const {explore} = await getDictionary(locale)
  return (
    <section className='container py-20'>
      <ExploreClient title={explore.title} description={explore.description} placeholder={explore.placeholder} translate={explore.of} locale={locale}/>
    </section>
  )
}
