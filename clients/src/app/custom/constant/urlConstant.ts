import { environment } from 'src/environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.apiUrl + 'auth/login',
        Logout: environment.apiUrl + 'auth/logout',
        ContactUs: environment.apiUrl + 'auth/contactUs',
    },
    Product: {
        Insert: environment.apiUrl + 'product/insert',
        Update: environment.apiUrl + 'product/update',
        Delete: environment.apiUrl + 'product/delete',
        Get: environment.apiUrl + 'product/get',
    },
    WebData: {
        Insert: environment.apiUrl + 'webData/insert',
        Update: environment.apiUrl + 'webData/update',
        Get: environment.apiUrl + 'webData/get',
    },
    Users: {
        GetList: environment.apiUrl + 'api/Account/GetUserList',
        FindByName:environment.apiUrl + 'User/FindUserByName'
    },
};
