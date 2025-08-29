import { getLocale } from '../../../lib/locale'
import { getDictionary } from '../../..//lib/transilation'

import ContactClient from './ContactClient'

export default async function ContactPage() {
    const locale = await getLocale()
    const {contact} = await getDictionary(locale)
  return (
    <ContactClient subTitle={contact.form.subTitle} title={contact.form.title} nameLabel={contact.form.inputs.name} namePlaceholder={contact.form.placeholders.name} emailLabel={contact.form.inputs.email} emailPlaceholder={contact.form.placeholders.email} messageLabel={contact.form.inputs.message} messagePlaceholder={contact.form.placeholders.message} sendBtn={contact.form.btn} />
  )
}
