import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { FetchData } from '../Store/Slice/ProductSlice';
import Loader from './Loader';

export default function Cards() {


    const { data: products, StatusesLoader } = useSelector((state) => state.GetProductsReducer)
    const dispatch = useDispatch()
    const [data, setData] = useState(products);

    useEffect(() => {
        dispatch(FetchData());
    }, [])

    useEffect(() => {
        if (StatusesLoader === "PRODUCT_LOADED") {
            setData(products);
        }
    }, [StatusesLoader, products]);
    

    const searchFiltered = (e) => {
        const value = e.target.value.trim().toLowerCase();
        // when input is emoty  show all data
        if (!value.trim()) {
            setData(products)
            return;
        }

        const filtered = products.filter((item) => item.title.toLowerCase().includes(value))
        setData(filtered);
    }


    return (
        <>
            <input type="text" onChange={searchFiltered} placeholder='search' className='p-2 border border-4 rounded-md' />
            {StatusesLoader === "GET_PRODUCT" && <Loader />}
            {StatusesLoader === "PRODUCT_LOADED" && (
                <div className='flex flex-wrap gap-2 justify-center items-center'>
                    {
                        data.map(({ image, title, description, price }, idx) => (
                            <Card key={idx} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={image} />
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        {description}
                                    </Card.Text>
                                    <Button variant="primary">{price}</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            )}
        </>
    )
}
