import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/Table';




function App() {

  const [search, setSearch] = useState('');
  console.log(search)

  const [dataTable, setDataTable] = useState([]);
  console.log(dataTable);

useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then(res => setDataTable(res.data))
      .catch(err => console.log(err))
  }, []);

  

  const column = [
    {heading: 'Name', value: 'name'},
    {heading: 'Email', value: 'email'},
    {heading: 'Phone', value: 'phone'},
    {heading: 'City', value: 'address.city'},
  ]

  const search1 = (data) => {
    return data.filter(item=> item.name.toLowerCase().includes(search))
  };

  return (
    <div className="App">
      <div>
      
        <input 
        type="text"
        placeholder='Search Recipient'
        className='search'
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div>
        <h1>Dynamic Table</h1>
        <Table data={search1(dataTable)} column={column}/>
      </div>
      
    </div>
  );  
}

export default App;
