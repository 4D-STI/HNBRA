
import { users } from '../../repository/models/user.model';

export const usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: users,
    },
];
