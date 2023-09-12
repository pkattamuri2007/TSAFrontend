import React from 'react'

export default function Symptom({data,id}) {
  return (
    <div key={id}>
        <h2>{data} </h2>
    </div>
  )
}

