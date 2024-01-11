import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchDocuments } from '../api';
import DocumentTemplate from './document';

export default function Documents (): JSX.Element {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery('items', ({ pageParam = 1 }) => fetchDocuments(pageParam), {
        getNextPageParam: (_lastPage, pages) => {
            return pages.length + 1;
        },
        suspense: true,
    });


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;

        if (!bottom || !hasNextPage) {
            return;
        }

        fetchNextPage();
    };

    if (!data) {
        return <div>(empty)</div>;
    }

    return (
        <div className="documents" onScroll={handleScroll}>
            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.data?.map(document => <DocumentTemplate key={document.id} {...document} />)}
                </React.Fragment>
            ))}
            {isFetchingNextPage ? <div className="documents-loading">Loading more...</div> : hasNextPage ? <div className="documents-loading"><button onClick={() => fetchNextPage()}>Load More</button></div> : null}
        </div>
    );
}
