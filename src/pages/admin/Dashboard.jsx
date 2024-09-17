import { useFetchData } from '6pp';
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';
import { CurveButton, SearchField } from '../../components/styles/StyledComponent';
import { purple } from '../../constants/color';
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hooks.hook';

const Dashboard = () => {

  const { loading, data, error } = useFetchData(`${server}/api/v1/admin/stats`, 'dashboard-stats');

  const { stats, messagesChart} = data || {};

  useErrors([{
    isError: error,
    error: error
  }]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        borderRadius: '1rem',
        margin: {
          xs: '4rem 0',
          md: '2rem 0'
        }

      }}
    >
      <Stack  direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
        <AdminPanelSettingsIcon 
          sx={{ fontSize: {
              xs: '2rem',
              sm: '3rem'
            }
           }}/>
        <SearchField 
          placeholder='Search...'
          name='search'
          sx={{
            padding: {
              xs: '0.5rem 1rem',
              sm: '1rem 1.5rem'
            }
          }}
        />
        <CurveButton
          sx={{
            padding: {
              xs: '0.5rem 1rem',
              sm: '1rem 1.5rem'
            }
          }}
        >
          Search
        </CurveButton>
        <Box flexGrow={1}/>
        <Typography
          sx={{
            display: {
              xs: 'none',
              lg: 'block'
            }
          }}
        >
          { moment().format('dddd, D MMMM YYYY')}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  )

  const Widget = ({ title, value, Icon }) => (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem 0',
        borderRadius: '1.5rem',
        width: '20rem'
      }}
    >
      <Stack 
        alignItems={'center'}
        spacing={'1rem'}
      >
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            border: `5px solid ${purple}`,
            width: '5rem',
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          { value }
        </Typography>
        <Stack 
          direction={'row'}
          alignItems={'center'}
          spacing={'1rem'}
        >
          { Icon }
          <Typography>{ title }</Typography>
        </Stack>
      </Stack>
    </Paper>
  )

  const Widgets = (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      spacing={'2rem'}
      justifyContent={'space-between'}
      alignItems={'center'}
      margin={'2rem 0'}
    > 
      <Widget title={'Users'} value={stats?.usersCount} Icon={ <PersonIcon />}/>
      <Widget title={'Chats'} value={stats?.totalChatsCount} Icon={ <GroupIcon />}/>
      <Widget title={'Messages'} value={stats?.messagesCount} Icon={ <MessageIcon />}/>
    </Stack>
  )

  return (
    <AdminLayout>
        {
          loading ? (
            <Skeleton height={'100vh'} />
           ) : (
                  <Container component={'main'}>
                { Appbar }
                <Stack 
                  direction={{
                    xs: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    xs: 'center',
                    lg: 'stretch',
                  }}
                  sx={{
                    gap: '2rem',
                  }}
                  flexWrap={'wrap'} 
                  justifyContent={'center'}
                >
                  Chat Area
                  <Paper 
                    elevation={3}
                    sx={{
                      padding: '2rem 3.5rem',
                      borderRadius: '1rem',
                      width: '100%',
                      maxWidth: '45rem',
                    
                    }}
                  >
                    <Typography 
                      variant='h4'
                      margin={'2rem 0'}
                    >Last Messages</Typography>
                    <LineChart value={ messagesChart || [] }/>
                  </Paper>

                  <Paper
                    elevation={3}
                    sx={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { xs: '100%', sm: '50%'},
                      position: 'relative',
                      maxWidth: '25rem',
                    }}
                  >
                    <DoughnutChart labels={['Single Chats', 'Group Chats']} value={[stats?.totalChatsCount - stats?.groupsCount, stats?.groupsCount] || []}/>

                    <Stack
                      position={'absolute'}
                      direction={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      spacing={'0.5rem'}
                      width={'100%'}
                      height={'100%'}
                    >
                      <GroupIcon />
                      <Typography>VS</Typography>
                      <PersonIcon />
                    </Stack>
                  </Paper>
                </Stack>
                { Widgets }
              </Container>
           )

        }
    </AdminLayout>
  )

  
}

export default Dashboard;