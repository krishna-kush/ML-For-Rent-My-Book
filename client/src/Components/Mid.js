import React from 'react'
import { useLocation } from 'react-router-dom'

export default () => {

    let dest = useLocation()
    console.log(dest.state);

    return (
        <div>
            <form method="POST" action="/finalise">
            <input type="hidden" name ="dest" value={dest.state}/>


            <div class="form-items">
                <label>Name</label>
                <input type="text" name="username" placeholder="none" required />
            </div>
            <div class="form-items">
                <label>Book Name</label>
                <input type="text" name="book_name" placeholder="none" required />
            </div>
            <div class="form-items">
                <label>Price</label>
                <input type="text" name="price" placeholder="none" required/>
            </div>
            <div class="form-items">
                <label>Discription</label>
                <input type="text" name="disc" placeholder="none"/>
            </div>

            <button type="submit">Submit</button>
            </form>
        </div>
    )
}
