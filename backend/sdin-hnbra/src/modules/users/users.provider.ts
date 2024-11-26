
import { Users } from '../../repository/models/user.model';

export const usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: Users,
    },
];
