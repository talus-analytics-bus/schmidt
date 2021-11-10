/**
 * Metadata record
 */
export type Metadatum = {
  field: string
  entity_name: string
  linked_entity_name: string | null
  definition_short: string | null
}

/**
 * Return fully qualified data field name given a metadatum.
 */
export function getFullFieldName(md: Metadatum): string {
  if (
    md.linked_entity_name === null ||
    md.linked_entity_name === md.entity_name
  ) {
    return `${md.entity_name}.${md.field}`
  }
  return `${md.entity_name}.${md.linked_entity_name}.${md.field}`
}
