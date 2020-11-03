import { environment } from '../../environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.apiUrl + 'auth/login',
        Logout: environment.apiUrl + 'auth/logout',
    },
    Product: {
        Insert: environment.apiUrl + 'product/insert',
        Update: environment.apiUrl + 'product/update',
        Get: environment.apiUrl + 'product/get',
    },
    Users: {
        GetList: environment.apiUrl + 'api/Account/GetUserList',
        FindByName:environment.apiUrl + 'User/FindUserByName'
    },
};
