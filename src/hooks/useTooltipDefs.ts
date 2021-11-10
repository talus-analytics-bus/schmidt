import { useMemo } from 'react'
import { getFullFieldName, Metadatum } from '../components/misc/MetadataQuery'
import useMetadata from './useMetadata'

/**
 * Provides tooltip definitions
 */
function useTooltipDefs(): Record<string, string> {
  const metadata: Metadatum[] = useMetadata()
  return useMemo(() => {
    const apiDefs: Record<string, string> = {}
    metadata.forEach(d => {
      const fullFieldName = getFullFieldName(d)
      if (d.definition_short !== null)
        apiDefs[fullFieldName] = d.definition_short
    })

    return {
      ...apiDefs,
      authors: apiDefs['Item.Author.authoring_organization'],
      author_types: apiDefs['Item.Author.type_of_authoring_organization'],
      events: apiDefs['Item.Event.name'],
      funders: apiDefs['Item.Funder.name'],
      key_topics: apiDefs['Item.key_topics'],
      covid_tags: apiDefs['Item.covid_tags'],
      years: 'Year the publication was published',
      'Item.Author.if_national_country_of_authoring_org':
        "The location of the authoring organization, or 'International'" +
        ' if multilateral',
    }
  }, [metadata])
}

export default useTooltipDefs
