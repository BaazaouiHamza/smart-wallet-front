import * as React from 'react'
import * as t from 'io-ts'
import { FormattedMessage } from 'react-intl'
import { record } from 'fp-ts'
import english from './translations-en.json'
import french from './translations-fr.json'

export type MessageID = keyof typeof english
export type Messages = { [K in keyof typeof english]: string }

const data: { [K in 'en' | 'fr']: Messages } = { en: english, fr: french }

export const Locale = t.keyof(data)
export type Locale = t.TypeOf<typeof Locale>

type MessageProps = React.ComponentProps<typeof FormattedMessage> & {
  id: MessageID
  msgProsp?: string
}

export const locales = record.keys(data)
export const TranslatedMessage = (p: MessageProps) => <FormattedMessage {...p} />
export const translatedMessage = (locale: Locale) => (id: MessageID) => data[locale][id]

export default data
