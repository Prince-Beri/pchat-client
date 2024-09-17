import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hooks.hook';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc.reducers';
import toast from 'react-hot-toast';


const Notifications = () => {

  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);

  const {isLoading, error, isError, data, } = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {

    dispatch(setIsNotification(false));
    acceptRequest('Accepting...', { requestId: _id, accept });
  }
  
  const closeNotificationHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);


  return (
    <Dialog open={isNotification} onClose={closeNotificationHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? (
          <Skeleton />
          ) : (
            <>
              {
                data?.allRequests.length > 0 ? (
                      data?.allRequests?.map(({ sender, _id })  => (
                        <NotificationItem 
                          sender={sender}
                          _id={_id}
                          handler={friendRequestHandler}
                          key={_id}
                        />
                    ))
                ) : (
                  <Typography textAlign={'center'}>0 Notifications</Typography>
                )
              }
            </>
          )
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler}) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
          direction={'row'}
          spacing={'1rem'}
          alignItems={'center'}
          width={'100%'}
      >
          <Avatar src={avatar}/>
          <Typography
              variant='body1'
              sx={{
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'

              }}
              title={name}
          >
            { `${name} send you friend request.`}
          </Typography>
          <Stack 
            direction={{
              xs: 'column',
              sm: 'row'
            }}
          >
            <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
            <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
          </Stack>
      </Stack>
    </ListItem>
  
)});

export default Notifications;