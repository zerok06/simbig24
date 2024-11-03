import React, { useEffect } from 'react'

const GetCountParticipants = () => {
  useEffect(() => {
    ;(async () => {
      const fetching = await fetch(
        'https://simbig24-api.onrender.com/registers'
      )
      const response = await fetching
      console.log(response)
    })()
  }, [])

  return <div></div>
}

export default GetCountParticipants
