import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import * as cp from '../components/misc/ContextProvider.js'
import { Metadatum } from '../components/misc/MetadataQuery'

const API_URL = process.env.GATSBY_API_URL

/**
 * Retrieves metadata and saves to app data context, if not already done
 */
function useMetadata(): Metadatum[] {
  const context = useContext<any>(cp.appContext)
  const initMetadata: Metadatum[] = context?.data?.metadata || []
  const [metadata, setMetadata] = useState<Metadatum[]>(initMetadata)
  useEffect(() => {
    if (metadata.length === 0)
      axios.get(`${API_URL}/get/metadata`).then(async res => {
        const metadata: Metadatum[] = res.data.data as Metadatum[]
        setMetadata(metadata)
        context.setData({ ...context.data, metadata })
      })
  }, [])
  return metadata
}

export default useMetadata
