import { Button } from 'antd';
import * as React from 'react';
import axios from 'axios';

export const AppHome = () => {
    const [num, setNum] = React.useState(0);
    const [genre, setGenre] = React.useState([]);

    const btnClick = () => {
        fetch('http://localhost:3001/')
            .then(res => res.json())
            .then(console.log);
    }

    return <div>
        <h1>APP HOME</h1>
        <Button onClick={btnClick}>BTN</Button>
    </div>
}