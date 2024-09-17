import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponent';
import { bgGradient, matBlack } from '../constants/color';
import { useAsyncMutation, useErrors } from '../hooks/hooks.hook';
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc.reducers';
const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'));
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'));

const Group = () => {

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate('/');
  }
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
  
  const [members, setMembers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdateValue, setGroupNameUpdatedValue] = useState('');
  const[confirmDeleteDailog, setConfirmDeleteDialog] = useState(false);

  const chatId = useSearchParams()[0].get('group');
  const myGroups = useMyGroupsQuery('');
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  const [updateGroupName, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  const [removeMembers, isLoadingRemoveMembers] = useAsyncMutation(useRemoveGroupMembersMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);
 

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    }
];
  
  useErrors(errors);

  
  useEffect(() => {
    const groupData = groupDetails.data;
    if(groupData){
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }
    

    return () => {
      setGroupName('');
      setGroupNameUpdatedValue('');
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails]);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const handleUpdateGroupName = () => {
    setIsEdit(false);
    updateGroupName('Updating Group Name...', { chatId, name: groupNameUpdateValue });
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);

  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));

    
  }
  const deleteHandler = () => {
    deleteGroup('Deleting Group...', chatId);
    closeConfirmDeleteHandler();
    navigate('/groups');
    
  }
  const removeMemberHandler = (userId) => {
    removeMembers('Removing Member...', { chatId, userId });
    
  }
  

  const GroupName = (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} padding={'2rem'} spacing={'1rem'}>
      {isEdit ? (
        <>
          <TextField 
            value={groupNameUpdateValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={handleUpdateGroupName} disabled={isLoadingGroupName} >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography title={groupName} variant='h5'>{ groupName }</Typography>
          <IconButton disabled={isLoadingGroupName} onClick={() => setIsEdit(true)} >
            <EditIcon />
          </IconButton>
        </>
      )

      }
    </Stack>
  )
  const IconBtns = (
  <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none'
          },
          position: 'fixed',
          top: '2rem',
          right: '1rem'
        }}
      >
        <IconButton onClick={handleMobile}> 
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title='back' >
          <IconButton
            sx={{
              position: 'absolute',
              top: '2rem',
              left:'2rem',
              bgcolor: matBlack,
              color: 'white',
              '&:hover':{
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
            onClick={navigateBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
    </Tooltip>
  </>
  );

  const ButtonGroup = (
    <Stack 
      direction={{
        xs: 'column-reverse',
        sm: 'row'
      }}
      spacing={'1rem'}
      padding={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem'
      }}
      marginTop={'0.5rem'}
    >
      <Button 
        size='large' 
        color='error' 
        startIcon={ <DeleteIcon /> }
        onClick={openConfirmDeleteHandler}
        >
          Delete Group
      </Button>
      <Button 
        size='large' 
        variant='contained' 
        startIcon={ <AddIcon /> }
        onClick={openAddMemberHandler}
      >
        Add Members
      </Button>
    </Stack>
  ) 

  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={'100vh'}>
      <Grid
        item
        sm={4}
        sx={{
          display:{
            xs: 'none',
            sm: 'block',
          },
          

        }}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Grid>
      <Grid 
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
       { IconBtns }
       {groupName && (
        <>
          { GroupName }
          <Typography
            margin={'2rem'}
            variant='body1'
            alignSelf={'flex-start'}
          >
            Members
          </Typography>

          <Stack
            maxWidth={'45rem'}
            width={'100%'}
            boxSizing={'border-box'}
            padding={{
              sm: '1rem',
              xs: '0',
              md: '1rem 4rem'
            }}
            spacing={'2rem'}
            height={'50vh'}
            overflow={'auto'}
          >
            { isLoadingRemoveMembers ? (
              <CircularProgress /> 
            ) : (
                  members.map((i) => (
                    <UserItem 
                      isAdded
                      user={i} 
                      key={i._id} 
                      styling={{
                        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
                        padding: '1rem 2rem',
                        borderRadius: '1rem'
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
              )}
          </Stack>
          { ButtonGroup }
        </>
       ) }
      </Grid>
       {
        isAddMember && (
          <Suspense fallback={ <Backdrop  open/>}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )
       }
       { confirmDeleteDailog && (
          <Suspense fallback={ <Backdrop  open/>}>
            <ConfirmDeleteDialog 
              open={confirmDeleteDailog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
       )}

      <Drawer 
        open={isMobileMenuOpen} 
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: 'block',
            sm: 'none'
          }
        }}  
      >
       <GroupList w={'50vw'} myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Drawer>
    </Grid>
  )
}

const GroupList = ({ w = '100%', myGroups = [], chatId}) => (
  <Stack width={w}
    sx={{
      backgroundImage: bgGradient,
      height: '100vh',
      overflow: 'auto'
    }}
  >
    {myGroups.length > 0 ?  (
        myGroups.map((group) => (
          <GroupListItem key={group._id} group={group} chatId={chatId}/>
        ))
      ) : (
        <Typography textAlign={'center'} padding={'1rem'}>
            No Groups
        </Typography>
      )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link 
      to={`?group=${_id}`}
      onClick={(e) => {
        if(chatId === _id) e.preventDefault();
      }}
    
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} padding={'0.5rem'}>
        <AvatarCard avatar={avatar}/>
        <Typography>{ name }</Typography>
      </Stack>
    </Link>
  );
});

export default Group;