import { Stack as MuiStack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Stack = styled(MuiStack)(({ theme }) => ({
  alignItems: 'stretch',
  display: 'flex',
  flex: 1,
  flexWrap: 'nowrap',
  overflow: 'hidden',
  borderRight: `solid ${theme.palette.grey[300]}`,
  width: 'calc(100% - 48px)',
}));
