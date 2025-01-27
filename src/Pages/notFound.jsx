import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    
  return (
    <div className="urlNotFound">
        <span>404</span>
        <h3>URL Not Found!</h3>
        <Link to="/" className='orangeBtn'> Back to Home </Link>
    </div>
  )
}

export default NotFound