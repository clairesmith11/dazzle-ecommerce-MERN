import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('test1234', 10),
        isAdmin: true
    },
    {
        name: 'Lisa',
        email: 'lisa@gmail.com',
        password: bcrypt.hashSync('test1234', 10)
    },
    {
        name: 'Sue',
        email: 'sue@gmail.com',
        password: bcrypt.hashSync('test1234', 10)
    }
];

export default users;