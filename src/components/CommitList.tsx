import React, { useState, useEffect } from 'react';
import { getRepocommits } from '../services/github.service';
import { format } from 'date-fns';

type Commit = {
    sha: string;
    commit: {
      author: {
        name: string;
        date: Date;
      }
      message: string;
    };
  };
  
  type CommitListProps = {
    username: string;
    repoName: string;
  };

const CommitList = ({ username, repoName }: CommitListProps) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCommits = async () => {
            setLoading(true);
    
            try {
            const data = await getRepocommits(username, repoName);
            setCommits(data.reverse());
            } catch (error) {
            console.error(error);
            } finally {
            setLoading(false);
            }
        };
    
        fetchCommits();
    }, [username, repoName]);

    return (
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Commits of reposiory: {repoName}</h1>
    
            {loading && <p>Loading commits...</p>}
    
            <ul className='space-y-3'>
                {commits.map((commit) => (
                    <li key={commit.sha}>
                      <>
                        <div>{commit.commit.message}</div>
                        <div>Author: {commit.commit.author.name} <span>{format(new Date(commit.commit.author.date), 'yyyy-MM-dd HH:mm:ss')}</span></div>
                      </>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommitList