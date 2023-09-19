import React, { useEffect, useState } from 'react';
import { getUserData, getUserRepos } from '../services/github.service';
import CommitList from '../components/CommitList';
import SearchForm from '../components/SearchForm';

type Repo = {
    id: number;
    name: string;
}

type UserData = {
    name: string; 
    login: string; 
    html_url: string;
};

const Home = () => {
    const [userData, setUserData] = useState<UserData>({ 
      name: '',
      login: '',
      html_url: '',
    });
    const [repos, setRepos] = useState<Repo[]>([]);
    const [showRepos, setShowRepos] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

    const handleSearch = async (username: string) => {
      if (username.trim() === '') {
        return;
      }
  
      setLoading(true);
  
      try {
        const data = await getUserData(username);
        setUserData(data);

        const repos = await getUserRepos(username);
        setRepos(repos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const username = 'amendoza26';
          const data = await getUserData(username);
          setUserData(data);
  
          const repos = await getUserRepos(username);
          setRepos(repos);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const handleShowRepos = () => {
      setShowRepos(true);
    };

    const handleSelectRepo = (repoName: string) => {
      setSelectedRepo(repoName);
    };
  
      return (
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate text-center">
                  List of Commits App
                </h1>
              </div>
            </div>
          </div>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <SearchForm onSearch={handleSearch} />
    
              {loading && <p className="text-center mt-4">Loading...</p>}
    
              {userData.name && (
                <div className="mt-8 md:flex space-x-10">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-900">Initial user: {userData.name}</h2>
                    <h3><a>{userData.html_url}</a></h3>
                    {showRepos ? (
                      <>
                        <h3 className="mt-6 text-xl font-semibold text-gray-900">Repositories</h3>
                        <ul className="mt-4 space-y-2">
                          {repos.map((repo) => (
                            <li key={repo.id} className="flex items-center justify-between">
                              <span className="hover:underline">{repo.name}</span>
                              <button
                                onClick={() => handleSelectRepo(repo.name)}
                                className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                              >
                                Repository Commits
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <button
                        onClick={handleShowRepos}
                        className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        List of Repos
                      </button>
                    )}
                  </div>
                  {selectedRepo && (
                    <div className="md:w-1/2 mt-8 md:mt-0">
                      <CommitList username={userData.login} repoName={selectedRepo} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      );
  }
  
  export default Home;