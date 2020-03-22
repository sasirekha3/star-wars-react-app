import React, { Component, useRef, useEffect, useState } from 'react';
import { Pagination, ToggleButtonGroup, ToggleButton, Table, InputGroup, Button, FormControl } from 'react-bootstrap';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
// const useMountEffect = (fun) => useEffect(fun, [])

export const SearchResults = ({ results, paginationItems, noResultString }) => {
    const searchResultsRef = useRef(null);
    useEffect(() => { scrollToRef(searchResultsRef) }, [results]);

    return (
        <div ref={searchResultsRef}>
            {results.length === 0 ?
                <h2 id="noResults">{noResultString}</h2>
                :
                <div>
                    <br />
                    <br />
                    <h2>Results:</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Pagination size="sm">{paginationItems}</Pagination>
                    </div>

                    <Table responsive bordered variant="dark" >
                        <thead>
                            <tr>
                                <th>Character</th><th>Movie</th><th>Scene Title</th><th>Quote</th><th>Year</th><th>Sequence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result._id}>
                                    <td>{result._source.character}</td><td>{result._source.movie}</td><td>{result._source.sceneTitle}</td><td>{result._source.quote}</td><td>{result._source.year}</td><td>{result._source.sequence}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )

}