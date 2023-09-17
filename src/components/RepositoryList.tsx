import React from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {repositories.map((repo) => (
        <div key={repo.id} className="bg-white rounded shadow-md p-4">
          <h2 className="text-lg font-semibold">{repo.name}</h2>
          <p className="text-sm text-gray-600">{repo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
