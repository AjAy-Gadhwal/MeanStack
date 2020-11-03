import { environment } from '../../environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.apiUrl + 'auth/login',
    },
    Property: {
        Add: environment.apiUrl + 'EaseRent/addProperty',
        AddDetail: environment.apiUrl + 'EaseRent/addPropertyDetails',
        ByUserId: environment.apiUrl + 'EaseRent/getPropertyByUserId',
    },
    Users: {
        GetList: environment.apiUrl + 'api/Account/GetUserList',
        FindByName:environment.apiUrl + 'User/FindUserByName'
    },
};
