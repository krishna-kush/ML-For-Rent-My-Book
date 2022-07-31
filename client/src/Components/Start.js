import React, {useState} from 'react'
import {Link} from "react-router-dom";


export default () => {
    const [img, setImg] = useState("")

    let imgChanged = (event) => {
        let img_file = event.target.files[0] // array of files uploaded...
        console.log(img_file);


        let convertImg = (file) => {
            let reader = new FileReader()

            reader.readAsDataURL(file)
            
            reader.onload = () => {
                setImg(reader.result)
            }
        }

        convertImg(img_file)
    }


    return (
        <div>
            <div class="img">
                <label>Book Image (Under 10mb): </label>
                <input
                type="file"
                name="book_image"
                onChange={imgChanged}
                required/>

                {/* <button onClick={() => {
                    UpImg('book_image')
                }}>Upload Img</button> */}
            </div>
            
            <Link to={
                {
                    pathname: '/mid',
                    state: img
                }
            }>
                <button type="submit">Next</button>
            </Link>
        </div>
    )
}
