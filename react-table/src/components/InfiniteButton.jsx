import axios from 'axios';
import React from 'react';
import { QueryClient, useInfiniteQuery,QueryClientProvider } from 'react-query';

const fetchData = ({pageParam = 1}) => {
  return axios.get(`http://localhost:3000/stores?_limit=2&_page=${pageParam}`)
}

const client = new QueryClient();

const InfiniteTable = () => {
  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['store'], fetchData,
  {
    getNextPageParam : (_lastPage, pages) =>{
      if(pages.length < 4) {
        return pages.length + 1
      }else{
        return undefined;
      }
    }
  })

  if(isLoading) {
    return <div>loading</div>
  }

  if(isError) {
    return <div>error</div>
  }

  return(
    <div>
        <div>
            {
              data?.pages.map((group, index) => {
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
    </div>
  )

}



const InfiniteButton = () => {
  return(
    <>
      <QueryClientProvider client={client}>
          <InfiniteTable/>
      </QueryClientProvider>
    </>
  )
}

export default InfiniteButton;