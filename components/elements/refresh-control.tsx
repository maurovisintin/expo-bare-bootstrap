import React, { memo, useEffect, useState } from 'react';

import {
  RefreshControl as RefreshControlCore,
  RefreshControlProps
} from 'react-native';

const RefreshControl = memo(({ refreshing, ...props }: RefreshControlProps) => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setFirstRender(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <RefreshControlCore
      refreshing={firstRender ? false : refreshing}
      {...props}
    />
  );
});

export { RefreshControl };
