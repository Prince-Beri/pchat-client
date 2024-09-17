import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hooks.hook';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import UserItem from '../shared/UserItem';
import { setIsNewGroup } from '../../redux/reducers/misc.reducers';
import toast from 'react-hot-toast';
const NewGroup = () => {

  const { isNewGroup } = useSelector((state) => state.misc);

  const dispatch = useDispatch();


  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();


  const errors = [{
    isError,
    error
  }];

  useErrors(errors);

  const groupName = useInputValidation('');

  const [selectMembers, setSelectMembers] = useState([]);


  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }

  const selectMemberHandler = (id) => {
    setSelectMembers((prev) => prev.includes(id) ? prev.filter((curElement) => curElement !== id) : [...prev, id])
  }

  const submitHandler = () => {
    if(!groupName.value){
      return toast.error('Group Name is required');
    }

    if(selectMembers.length < 2){
      return toast.error('Please select at least 2 Members');
    }

    // Creating Groups.

    newGroup('Creating new Group...', { name: groupName.value, members: selectMembers });
    

    closeHandler();
  }

  

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'22rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
        <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            isLoading ? (
              <Skeleton />
            )
            :
            (
                data?.friends?.map((user) => (
                <UserItem 
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectMembers.includes(user._id)}
                />
              ))
            )
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant='outlined' color='error' size='large' onClick={closeHandler}>Cencel</Button>
          <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup;