import React from 'react'
import { supabase } from './superbaseClient.js'

function MediaUplad(file) {

    const mediaUplaodPromise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
                return
            }

            const timeStamp = new Date().getTime()
            const newName = timeStamp + file.name

            supabase.storage.from("images").upload(newName,file,{
                upsert:false,
                cacheControl: "3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
                // console.log(publicUrl)
    
            }).catch(()=>{
                reject("Error ocured in supabase connection")
            })
        }
    )

    return mediaUplaodPromise
  
}

export default MediaUplad