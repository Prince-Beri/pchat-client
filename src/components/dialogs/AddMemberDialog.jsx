import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUser } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hooks.hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducers/misc.reducers';
const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();
    
    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);
    const { isAddMember } = useSelector((state) => state.misc);

    const { isError, error, isLoading, data } = useAvailableFriendsQuery(chatId);

    const [members, setMembers] = useState(sampleUser);
    const [selectMembers, setSelectMembers] = useState([]);

  
    const selectMemberHandler = (id) => {
      setSelectMembers((prev) => prev.includes(id) ? prev.filter((curElement) => curElement !== id) : [...prev, id])
    }
    
    const closeHandler = () => {
        dispatch(setIsAddMember(false));
    }
    
    const addMemberSubmitHandler = () => {
        addMembers('Adding Members...', { chatId, members: selectMembers});
        closeHandler();
    }

    useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
            <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
            <Stack spacing={'1rem'}>
                {isLoading ? (
                    <Skeleton />
                  ): data?.friends?.length > 0 ? (
                        data?.friends?.map((i) => (
                            <UserItem 
                                key={i._id} 
                                user={i} 
                                handler={selectMemberHandler}
                                isAdded={selectMembers.includes(i._id)}
                            />
                        ))
                ) : (
                    <Typography textAlign={'center'}>No Friend's</Typography>
                )
                    
                }
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                <Button onClick={closeHandler} color='error'>Cancel</Button>
                <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMembers}>Submit</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog;