import { Button, Col, DatePicker, Row } from 'antd';
import * as React from 'react';
import PageLayout from './page_layout';
import dayjs from 'dayjs';
import { GET } from './constants';
import { CSVLink } from 'react-csv';
import { CloudDownloadOutlined } from '@ant-design/icons';

export const MonthlySummary = () => {
    const [date, setDate] = React.useState(dayjs());
    const [data, setData] = React.useState([]);

    const fetchData = () => {
        if (date) {
            GET(`/monthly_records/${date.format('YYYY-MM')}`).then(out => { setData(out.data); });
        }
    }

    const renderTable = () => {
        return data.map((row, rowIndex) => rowIndex > 0 ? (
            <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid black' }}>{cell}</td>
                ))}
            </tr>
        ) : null);
    };

    React.useEffect(() => {
        fetchData();
    }, [date]);

    React.useEffect(() => {
        console.log("DATA", data);
    }, [data]);

    return <PageLayout>
        <Row><Col md={9}></Col>
            <Col md={6}>
                <DatePicker picker='month' style={{ width: '100%', marginBottom: 50 }}
                    defaultValue={dayjs().subtract(0, 'month')} onChange={setDate}
                    disabledDate={d => { const dd = new Date(); return d.isAfter(new Date(`${dd.getFullYear()}-${dd.getMonth() + 1}-01`)) }} />
            </Col>
            <Col>
                <CSVLink data={data}>
                    <Button><CloudDownloadOutlined /> Download CSV
                    </Button>
                </CSVLink>
            </Col>
        </Row>
        <Row style={{ height: '90%', overflow: 'auto' }}>
            {data && data.length > 0 ?
                <table style={{ width: '100%', border: '1px solid black' }}>
                    <thead>
                        <tr style={{ textAlign: 'left' }}>
                            {data[0].map((header, index) => (
                                <th key={index} style={{ border: '1px solid black', width: index == 1 ? `${(100/(data[0].length + 5))*5}%` :`${100/(data[0].length + 5)}%` }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
                : null}
        </Row>
    </PageLayout>
}