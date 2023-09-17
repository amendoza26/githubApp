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
        placeholder="Buscar usuarios"
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;