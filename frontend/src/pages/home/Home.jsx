import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={"/shop"}>
        Shop Now
      </Link>
      <br></br>
      <Link to={"/category/coffee"}>Coffee</Link>
      
    </div>
  )
}

export default Home