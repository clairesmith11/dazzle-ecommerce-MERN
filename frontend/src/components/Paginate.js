import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Pagination } from 'react-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword, cat }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(p => (
                <LinkContainer
                    key={p + 1}
                    to={!isAdmin ?
                        keyword ? `/search/${keyword}/page/${p + 1}`
                            : cat ? `/collections/${cat}/page/${p + 1}`
                                : `/page/${p + 1}`
                        : `/admin/products/${p + 1}`}
                >
                    <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    );
};

export default Paginate;
