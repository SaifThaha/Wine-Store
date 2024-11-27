import React, { useState } from 'react';
import { Search } from 'lucide-react'

// const SearchForm = () => {
//   return (
//     <Form action="/" scroll={false} className="search-form">
//       <input
//         name='query'
//         defaultValue=''
//         className="search-input"
//         placeholder='Search Cocktails'
//       />

//       <div className="flex gap-2">
//         <button type="submit" className="search-btn text-white">
//             <Search className="size-5"/>
//         </button>
//       </div>
//     </Form>
//   )
// }
const SearchForm = ({onSearch}:{ onSearch: (query: string) => void }) =>{
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Pass the query back to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
        className="search-input"
        placeholder="Search Cocktails"
      />
      <button type="submit" className="search-btn text-white">
        <Search className="size-5" />
      </button>
    </form>
  );
}

export default SearchForm
