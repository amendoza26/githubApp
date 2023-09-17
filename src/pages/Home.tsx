import React, { useState } from 'react';
import { getUserData, getUserRepos } from '../services/github.service';
import SearchForm from '../components/SearchForm';

    type Repo = {
        id: number;
        name: string;
    }

    type UserData = {
        name: string; 
        login: string; 
    };

const Home = () => {
    const [userData, setUserData] = useState<UserData>({ 
        name: '',
        login: '',
      });
    const [repos, setRepos] = useState<Repo[]>([]);
    const [showRepos, setShowRepos] = useState(false);
    const [loading, setLoading] = useState(false);
    
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

    const handleShowRepos = () => {
        setShowRepos(true);
    };
  
    return (
        <div>
            <h1>Buscador de usuarios de GitHub</h1>
            <SearchForm onSearch={handleSearch} />

            {loading && <p>Cargando...</p>}

            {userData.name && (
                <div>
                    <h2>{userData.name}</h2>
                    {showRepos ? (
                        <>
                            <h3>Repositorios publicos</h3>
                            <ul>
                                {repos.map((repo) => (
                                <li key={repo.id}>{repo.name}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <button onClick={handleShowRepos}>Ver Repos</button>
                    )}
                </div>
            )}
        </div>
    );
  }
  
  export default Home;