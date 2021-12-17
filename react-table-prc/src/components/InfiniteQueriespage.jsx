import React from 'react';
import axios from 'axios';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ProductType } from './AddProduct';
import store from '../redux/configStore';


const fetchData = ({pageParam = 1}) => {
    return axios.get(`http://localhost:3000/stores?_limit=2&_page=${pageParam}`);
}

const client = new QueryClient();

const InfiniteComponent = () => {

    const {
        isLoading, 
        isError, 
        error, 
        data , 
        hasNextPage, 
        fetchNextPage, 
        isFetching, 
        isFetchingNextPage
      }  = useInfiniteQuery(
        ['store'],
        fetchData,
        {
            getNextPageParam : (_lastPage, pages) => {
                if(pages.length < 4) {
                    return pages.length + 1
                } else{
                    return undefined
                }
            }
        }
    )
  
    if(isLoading) {
        return <h2>is Loading</h2>
    }
  
    if(isError) {
        return <h2>is error</h2>
    }

    
    return(
        <div>
            <div>
                {
                    data?.pages.map((group , index) => {
                        return(
                            <div key={index}>
                                {
                                    group.data.map(store => (
                                        <h2 key={store.id}>{store.wholesaleProduct}</h2>
                                    ))
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>load more</button>
            </div>
            <div>
                {isFetching && !isFetchingNextPage} ? 'fetching': ''
            </div>
        </div>

    )
}

const InfiniteQueriespage = () => {

    

    return(
        <>
          <QueryClientProvider client={client}>
                <InfiniteComponent/>         
            </QueryClientProvider>
        </>
    )
}

export default InfiniteQueriespage;