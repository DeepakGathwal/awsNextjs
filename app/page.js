'use client'

import instance from "@/common/commonapi"
import { useState } from "react"

export default function Home() {
  const [project, setProject] = useState([])
  const [file, setFile] = useState([])
  const submitFile = async(e) => {
    e.preventDefault()
    const formFile = new FormData()
    formFile.append('project', project)
    formFile.append('file', file)
    const {data} = await instance.post('/project', formFile)
    if(data.data == 'Done') return alert('Done')
  }
  return (
<>
<div className='flex align-middle justify-items-center'>
<h1 className='text-3xl font-bold underline'>Upload</h1>

<form action="" method="post" className='inline-grid' onSubmit={submitFile}>
  <label htmlFor="" className='m-5 flex-initial'>Name Of Project
  <input type="text" className='ml-3 float-end bg-slate-400 ' name="" id="" onChange={(e) => setProject(e.target.value)} />
  </label>
  <label htmlFor="" className='m-5 flex-initial'> Project Files
      
      <input type="file" name="" className='ml-5 bg-slate-400 float-right float-end' multiple id=""  onChange={(e) => setFile(e.target.files[0])}/>
  </label>
  <input type="submit" value="Upload Project" className='from-red-50 text-red-950 bg-orange-100'/>
</form>
</div>
</>
  );
}
