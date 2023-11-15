import * as React from 'react';
import { MailOutlined } from '@ant-design/icons';

export const side_items = [
    {
        label: 'Summary',
        key: 'summary',
        icon: <MailOutlined />,
    },
    {
        label: 'Daily Records',
        key: 'daily',
        icon: <MailOutlined />,
    },
];

export const BASE_URL = 'http://localhost:3001';

export const GET = async (path) => {
    const res = await fetch(`${BASE_URL}${path}`);
    return res.json();
}

export const POST = async (path, data) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return res.json();
}

export const FOOTER_HEIGHT = 50;
export const HEADER_HEIGHT = 50;