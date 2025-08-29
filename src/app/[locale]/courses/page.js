import { getLocale } from '../../../lib/locale'
import { getDictionary } from '../../../lib/transilation'
import React from 'react'
export default async function ProjectsPage() {
    const locale = await getLocale()
    const { projects } = await getDictionary(locale)
  
  return (
    <div>
      {projects.projects}
    </div>
  )
}
