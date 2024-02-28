import queryClient from '_app/query-client';
import { apiService, socketService } from 'features/services';

import { User } from 'types';

apiService.on('error', (error: any) => {
  if (error.status === 401) {
    queryClient.setQueryData(['account'], null);
  }
});

socketService.on('connect', () => {
  const account = queryClient.getQueryData(['account']) as User;

  socketService.emit('subscribe', `user-${account._id}`);
});

socketService.on('user:updated', (data: User) => {
  queryClient.setQueryData(['account'], data);
});
