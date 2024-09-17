import { keyframes, Skeleton, styled } from '@mui/material';
import { Link as LinkComponent } from 'react-router-dom';
import { grayColor } from '../../constants/color';

 const VisuallyHidden = styled('input')({
    border: 0,
    clip: 'rect(0, 0, 0, 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
});

 const Link = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: '1rem';
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

 const InputBox = styled('input')`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1.5rem 3rem;
    border-radius: 1.5rem;
    background-color: ${grayColor};
`

 const SearchField = styled('input')`
    width: 20vmax;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    background-color: ${grayColor};
    font-size: 1.1rem;
`
 const CurveButton = styled('button')`
    border-radius: 1.5rem;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: black;
    color: white;
    font-size: 1rem;
    transition: ease-in 0.2s;
&:hover {
    color: rgba(150, 150, 150, 0.54);
}
`

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); 
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounceAnimation} 1s infinite`,
}));

export { 
    VisuallyHidden, 
    Link, 
    InputBox, 
    SearchField, 
    CurveButton, 
    BouncingSkeleton
}