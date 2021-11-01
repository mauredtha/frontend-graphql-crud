import React from 'react'
import { Link } from 'react-router-dom'

import { GET_BOOKS, DELETE_BOOK } from 'gql/books'

import { useQuery, useMutation } from '@apollo/client'

export default function List(props) {

    const [id, setId] = React.useState(null)

    const {loading, error, data} = useQuery(GET_BOOKS, {
        fetchPolicy: "no-cache",
    })

    const [deleteBook, {loading: loadingDeleteBook}] = useMutation(DELETE_BOOK, {
        refetchQueries: [GET_BOOKS],
        onError: (res) => {
            console.log(res.networkError)
        }
    })

    function fnDelete(_id){
        setId(_id)
        deleteBook({
            variables: {
                _id
            }
        })
    }

    if (loading) return "Loading...";

    if (error)
        return error?.graphQLErrors.map((error) => error) ?? error.networkError;

    if (data.getAllBooks.length === 0)
        return (
            <h1>Belum Ada Buku Didaftarkan <Link to="/books/new">Buat Baru</Link></h1>
        );

    return (
        <div>
            <h1>Daftar Buku 
                <Link to="/books/new" style={{fontSize: 12}}>( + Buat Baru)</Link>
            </h1>
            {
                data.getAllBooks.map( item => {
                    return (
                        <div key={item._id}>
                        {item.title} (<Link to={`/books/${item._id}/edit`}>Edit</Link>) (
                            <span style={{textDecoration: "underline", cursor: "pointer", color: "blue"}} onClick={() => fnDelete(item._id)}>
                                {id === item._id &&  loadingDeleteBook ? "Deleting..." : "Delete"}
                            </span>
                            )
                    </div>
                    );
                })
            }
        </div>
    );
}
