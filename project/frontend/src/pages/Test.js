import React from 'react';

import { useInfiniteQuery, useQueryClient } from 'react-query';
import { publicController } from '../api/public';
import { useParams } from 'react-router-dom';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

// export default function Test() {
//   let { questionId } = useParams();


//   const fetchAnswers = ({
//     pageParam = `http://localhost:8000/api/v1/public/answers/${questionId}/${1}-${5}`,
//   }) => {
//       return publicController.getPaginatedAnswersForQuestion(pageParam)
//   }

//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery('projects', fetchAnswers, {
//     getNextPageParam: (lastPage, pages) => lastPage.next,
//   });

//   return status === 'loading' ? (
//     <p>Loading...</p>
//   ) : status === 'error' ? (
//     <p>Error: {error.message}</p>
//   ) : (
//     <>
//       {data.pages.map((group, i) => (
//         <React.Fragment key={i}>
//           {group.answers.map((project) => (
//             <p key={project.id}>{project.body}</p>
//           ))}
//         </React.Fragment>
//       ))}
//       <div>
//         <button
//           onClick={() => fetchNextPage()}
//           disabled={!hasNextPage || isFetchingNextPage}
//         >
//           {isFetchingNextPage
//             ? 'Loading more...'
//             : hasNextPage
//             ? 'Load More'
//             : 'Nothing more to load'}
//         </button>
//       </div>
//       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
//     </>
//   );
// }



export default function Test() {
    let { questionId } = useParams();
      
  
    const fetchAnswers = ({
      pageParam = `http://localhost:8000/api/v1/public/answers/${questionId}/${1}-${5}`,
    }) => {
        return publicController.getPaginatedAnswersForQuestion(pageParam)
    }
  
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
      } = useInfiniteQuery(
        'projects',
        fetchAnswers,
        {
          getPreviousPageParam: firstPage => firstPage.prev ?? false,
          getNextPageParam: lastPage => lastPage.next?? false,
        }
      )
  
      const loadMoreButtonRef = React.useRef()

      useIntersectionObserver({
        target: loadMoreButtonRef,
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
      })
    
      return (
        <div>
          <h1>Infinite Loading</h1>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div>
                <button
                  onClick={() => fetchPreviousPage()}
                  disabled={!hasPreviousPage || isFetchingPreviousPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Older'
                    : 'Nothing more to load'}
                </button>
              </div>
              {data.pages.map(page => (
                <React.Fragment key={page.next}>
                  {page.answers.map(project => (
                    <p
                      style={{
                        border: '1px solid gray',
                        borderRadius: '5px',
                        padding: '10rem 1rem',
                        background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                      }}
                      key={project.id}
                    >
                      {project.body}
                    </p>
                  ))}
                </React.Fragment>
              ))}
              <div>
                <button
                  ref={loadMoreButtonRef}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage
                  ? 'Background Updating...'
                  : null}
              </div>
            </>
          )}
          
        </div>
      )
  }