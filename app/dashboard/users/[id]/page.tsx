import React from 'react'

const page = ({params}: {params:{id:string}}) => {

  const{id} = params;
  
  return (
    <div>User Details Profile: {id}</div>
  )
}

export default page
