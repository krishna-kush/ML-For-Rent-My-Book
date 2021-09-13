import React, {useState} from 'react'
import {Link} from "react-router-dom";

import Axios from 'axios'
import FormData from 'form-data'
import axios from 'axios';


export default () => {
    const [img_path, setImgPath] = useState("")


    let img_file = ""
    // let text_data = {
    //     img_path: img_path,
    //     username: "",
    //     book_name: "",
    //     price: "",
    //     disc: "",
    // }

    let ImgChanged = (event) => {
        img_file = event.target.files[0] // array of files uploaded...
        console.log(img_file);
    }

    // let Upload = () => {

        let UpImg = (img_imput_name) => {
            let form_data = new FormData()
            form_data.append(
                img_imput_name,
                img_file,
                img_file.name
                )
            console.log(form_data.get("book_image"))

    
            axios.post("http://localhost:5000/upload", form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            .then((res) => {
                console.log(res.data.dest);
                setImgPath(res.data.dest)
                // img_path = res.data
            })
        }

    //    // UpImg('book_image')

    //     let UpText = (name_ls) => {
    //         console.log(text_data);
    //         let form_data = new FormData()

    //         let val_temp_ls = Object.values(text_data)

    //         for (let [index, i] of name_ls.entries()) {
    //             form_data.append(
    //                 i, // field
    //                 val_temp_ls[index] // value
    //             )
    //         }

    //         console.log(form_data.get("username"))

    //         axios.post("http://localhost:5000/finalise", form_data, {
    //             headers: {
    //             'Content-Type': 'text/html; charset=UTF-8'
    //             }
    //         })
    //             // headers: form_data.getHeaders()
    //         // })
    //     }

    //     // UpText(['img_path', 'username', 'book_name', 'price', 'disc'])

    // // }


    return (
        <div>
            {/* <form method="POST" action="http://localhost:5000/upload" enctype="multipart/form-data">  */}
            <div class="img">
                <label>Book Image (Under 10mb): </label>
                <input
                type="file"
                name="book_image"
                onChange={ImgChanged}
                required/>

                <button onClick={() => {
                    UpImg('book_image')
                }}>Upload Img</button>
            </div>

            

            {/* <div className="up-button">
                <button onClick={Upload}>
                    Upload
                </button>
            </div> */}

            
            <Link to={
                {
                    pathname: '/mid',
                    state: img_path
                }
            }>
                <button type="submit">Next</button>
            </Link>
        </div>
    )
}
