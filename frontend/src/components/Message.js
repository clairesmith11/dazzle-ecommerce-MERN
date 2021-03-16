import { Alert } from 'react-bootstrap';

const Message = ({ message, type, heading }) => {
    return (
        <Alert variant={type} className="my-4">
            <Alert.Heading>{heading}</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default Message;
