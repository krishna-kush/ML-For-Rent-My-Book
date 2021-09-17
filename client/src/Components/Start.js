import React, {useState} from 'react'
import {Link} from "react-router-dom";

import Axios from 'axios'
import FormData from 'form-data'
import axios from 'axios';


export default () => {
    const [img, setImg] = useState("")


    // let img_file = ""
    // let text_data = {
    //     img_path: img_path,
    //     username: "",
    //     book_name: "",
    //     price: "",
    //     disc: "",
    // }

    let ImgChanged = (event) => {
        let img_file = event.target.files[0] // array of files uploaded...
        console.log(img_file);


        let ConvertImg = (file) => {
            let reader = new FileReader()

            reader.readAsDataURL(file)
            
            reader.onload = () => {
                setImg(reader.result)
            }
        }

        ConvertImg(img_file)

        // console.log(img);
    }



// --------------------------------------------------------------------------------------------------------------------

    // let Upload = () => {

        // let UpImg = (img_imput_name) => {
        //     let form_data = new FormData()
        //     form_data.append(
        //         img_imput_name,
        //         img_file,
        //         img_file.name
        //         )
        //     let ans = form_data.get("book_image").toString('base64')
        //     // console.log(ans);

    
        //     // axios.post("http://localhost:5000/upload", form_data, {
        //     //     headers: {
        //     //         'Content-Type': 'multipart/form-data'
        //     //       }
        //     // })
        //     // .then((res) => {
        //     //     console.log(res.data.dest);
        //     //     setImgPath(res.data.dest)
        //     //     // img_path = res.data
        //     // })

        //     // console.log("after");
        //     // let a = async () => {
        //     //     let b = await fetch("https://ml-for-rent-my-book-default-rtdb.firebaseio.com/first.json", {
        //     //         method: "POST",
        //     //         headers: {
        //     //             "Content-Type": "application/json",
        //     //         },
        //     //         body: JSON.stringify({
        //     //             img: ""
        //     //         })
        //     //     })
        //     //     console.log("hi");
        //     // }
        //     // a()
        //     // console.log("done");
        // }

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

// --------------------------------------------------------------------------------------------------------------------




    return (
        <div>
            {console.log("1")}
            {/* {} */}
            {/* <form method="POST" action="http://localhost:5000/upload" enctype="multipart/form-data">  */}
            <div class="img">
                <label>Book Image (Under 10mb): </label>
                <input
                type="file"
                name="book_image"
                onChange={ImgChanged}
                required/>

                {/* <button onClick={() => {
                    UpImg('book_image')
                }}>Upload Img</button> */}
            </div>

            

            {/* <div className="up-button">
                <button onClick={Upload}>
                    Upload
                </button>
            </div> */}

            
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
