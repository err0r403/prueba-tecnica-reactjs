import { Box } from '@mui/material';

export enum TabIndex {
  character = 0,
  location = 1,
  episode = 2
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: TabIndex;
  value: TabIndex;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
