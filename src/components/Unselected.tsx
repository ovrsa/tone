import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

// Reactコンポーネントを定義する際は、関数型コンポーネントとしてReact.FC型を使用
const Unselected: React.FC = () => {
  return (
    <>
      <ExternalLinkIcon />
      <Box pl={2}>Click task title to view the detail</Box>
    </>
  );
};

export default Unselected;