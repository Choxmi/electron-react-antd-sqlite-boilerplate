import { Button } from 'antd';
import * as React from 'react';
import { GET } from './constants';
import PageLayout from './page_layout';

export const Summary = () => {
    const [num, setNum] = React.useState(0);
    const [genre, setGenre] = React.useState([]);

    const btnClick = () => {
        GET('/users').then(out=>console.log(out))
    }

    return <PageLayout>
        <h1>APP HOME</h1>
        <Button onClick={btnClick}>BTN</Button>
    </PageLayout>
}