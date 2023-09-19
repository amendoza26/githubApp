import React, { useState } from 'react';

type SearchProps = {
    onSearch: (query: string) => void; 
}

const SearchForm = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search other users"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg py-2 px-4 focus:ring focus:ring-blue-200 shadow-md flex-grow"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ml-2">Search</button>
    </form>
  );
};

export default SearchForm;