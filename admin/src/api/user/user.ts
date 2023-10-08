import request from '@/utils/request'
console.log(request);

export const getUsers = () => request.get('https://randomuser.me/api/');
