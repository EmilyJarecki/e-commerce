import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import React from 'react'

const Search = () => {
    const [value, setValue] = useState('')
    const [data, setData] = useState('')

    const URL = "http://localhost:4000/products";

    const getProducts = async () => {
      try {
        const res = await fetch(URL);
        const allProducts = await res.json();
        setData(allProducts);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(()=>{
        getProducts()
    },[])
    console.log(data)

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const onSearch = (searchItem) => {
        setValue(searchItem)
    }


  return (
    <div className="App">
      <h1>Search</h1>
      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {Object.values(data)
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const name = item.name.toLowerCase();

              return (
                searchTerm &&
                name.startsWith(searchTerm) &&
                name !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Search