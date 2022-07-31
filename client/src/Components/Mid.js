import React, {useState} from 'react'
import {
    useLocation,
    Link
} from 'react-router-dom'

import Axios from 'axios'

export default () => {
    let img = useLocation()
    // console.log(img.state);


    const [done, setDone] = useState(false)
    const [data, setData] = useState({
        username: '',
        book_name: '',
        price: '',
        disc: '',
        img: img.state,
    })

    let txtChanged = (event) => {
        let name = event.target.name
        let value = event.target.value

        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(data);


    let post = (data) => {
        // Axios.post('http://localhost:5000/finalise', {
        console.log('post');
        Axios.post('/finalise', {
            username: data.username,
            book_name: data.book_name,
            price: data.price,
            disc: data.disc,
            img: data.img,
        })
        .then((res) => {
            let result = res.data
            if (result === 'DONE') {
                setDone(true)
            }
        })
    }

    if (done) {
        return (
            <div>

            <div>
                Your Presious Request Has Been Submited
            </div>

            <Link to="/">Go Back</Link>

            </div>
        )
    }

    return (
        <div>
            {/* <form method="POST" action="/finalise"> */}
                <div class="form-items">
                    <label>Name</label>
                    <input type="text" name="username" 
                    onChange={txtChanged} placeholder="none" required />
                </div>
                <div class="form-items">
                    <label>Book Name</label>
                    <input type="text" name="book_name"
                    onChange={txtChanged}  placeholder="none" required />
                </div>
                <div class="form-items">
                    <label>Price</label>
                    <input type="text" name="price" 
                    onChange={txtChanged} placeholder="none" required/>
                </div>
                <div class="form-items">
                    <label>Discription</label>
                    <input type="text" name="disc" 
                    onChange={txtChanged} placeholder="none"/>
                </div>

                <button type="submit" onClick={() => {
                    post(data)
                }}>Submit</button>
            {/* </form> */}
        </div>
    )
}
