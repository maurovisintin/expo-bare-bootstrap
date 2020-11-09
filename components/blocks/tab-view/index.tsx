import React, { useState, ReactElement, useEffect } from 'react';

import { TabContainer, TabContent } from './styled';
import TabItem from './tab-item';
import Container from '../../elements/container';

export type ConfigItemProps = {
  title: string;
  component: ReactElement | null;
};

export type Props = {
  config: ConfigItemProps[];
};

const TabView = ({ config }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(0);
  }, [config]);

  return (
    <Container>
      <TabContainer>
        {config.map((el: ConfigItemProps, index: number) => (
          <TabItem
            key={el.title}
            index={index}
            title={el.title}
            onPress={setSelectedTab}
            currentSelection={selectedTab}
          />
        ))}
      </TabContainer>
      <TabContent>{config[selectedTab].component}</TabContent>
    </Container>
  );
};

export default TabView;
