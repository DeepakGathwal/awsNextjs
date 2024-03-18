'use client'
import React, { useEffect, useState } from 'react'
import instance from '@/common/commonapi'

const Page = () => {
  const [project, setproject] = useState([])


const hello = async() => {
  const {data} =  await instance.get('project')
  const value = data.data.Contents
  setproject(value)
}

const download = async(name) =>{
  const response = await instance.put('project', JSON.stringify(name));
  return window.location.href = response.data
  
    
}

useEffect(() => {
hello()
},[])


    return (
    <>
    {project && project.map((el) => (
      <button  onClick={(e) => download(el.Key)} className='m-5 p-5 bg-slate-500 rounded border-red-600'>{el.Key.split('.')[0]}</button>
    ))}

    </>
  )
}

export default Page
