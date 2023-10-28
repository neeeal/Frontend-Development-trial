import React from 'react'
import './FileUpload.css'
import { useState } from 'react'
import { MdCloudUpload, MdDelete} from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

export default function FileUpload() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")  
  return (
    <main>
        <imageform 
        onClick ={() => document.querySelector(".input-field").click()}
        >
            <input type="file" accept='image/*' className='input-field' hidden 
            onChange={({ target: {files}}) => {
                files[0] && setFileName(files[0].name)
                if(files) {
                    setImage(URL.createObjectURL(files[0]))
                }
            }}
            
            
            
            />

            {image ?
            <img src={image} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} alt={fileName} />
            :
            <>
            <MdCloudUpload color='#1475cf' size={60}/>
            <p>Upload an image</p>
            </>
            
        
        }
        </imageform>

        <section className='filename-upload'>
            <AiFillFileImage color ='#1475cf' />
            <span className='filecontent'>
                {fileName} | 
                <MdDelete 
                onClick={() => {
                    setFileName("No selected file")
                    setImage(null)
                }}
                />
            </span>
        </section>

        <section className='results'>
        <h4>Classification</h4>
            <span className='resultscontent'>
                    {fileName} 
                </span>
        </section>

        <section className='results'>
        <h4>Recommendation</h4>
            <span className='resultscontent'>
                    {fileName} 
                </span>
        </section>
    </main>
  )
}
