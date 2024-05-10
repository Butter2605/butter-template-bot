require('dotenv').config();

const str = '> !help';
if (str.startsWith(`> ${process.env.prefix}`)) console.log('oke')