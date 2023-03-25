import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

export default function Pagination() {
    return (
        <nav aria-label='...'>
            <MDBPagination size='lg' className='mb-0'>
                {/*<MDBPaginationItem className='page-item active' aria-current='page'>*/}
                {/*    <MDBPaginationLink tag='span' className='page-link'>*/}
                {/*        1<span className='visually-hidden'>(current)</span>*/}
                {/*    </MDBPaginationLink>*/}
                {/*</MDBPaginationItem>*/}
                <MDBPaginationItem>
                    <MDBPaginationLink href='#'>1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink href='#'>2</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink href='#'>3</MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
        </nav>
    );
}