import React from 'react';
import { Tabs } from 'react-bootstrap';

const Tab = ({ product }) => {
    return (
        <div className="my-4">
            <Tabs defaultActiveKey="description" id="uncontrolled-tab-example">
                <Tab eventKey="description" title="Description">
                    <p>{product.description}</p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <p>Insert reviews here!</p>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Tab;
