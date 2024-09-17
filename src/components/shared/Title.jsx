import React from 'react';
import { Helmet } from 'react-helmet-async';
const Title = ({
    title='PChat',
    description='This is a chat app called PChat'
}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
    </Helmet>
  )
}

export default Title;