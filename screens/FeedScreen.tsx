import * as React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { selectors, global, actions } from '../redux';
import { images } from '../assets/images';
import {
  Text,
  Container,
  FlatButton,
  HeroOne,
  RefreshControl
} from '../components';
import { AppState } from '../AppState';
import { navigate } from '../navigation/navigation-service';
import { routeConstants } from '../navigation/route-constants';
import theme from '../theme';

const StyledImage = styled.Image`
  height: 300px;
  width: 300px;
  resize-mode: contain;
  margin: ${p => p.theme.paddings.regular};
`;

const FactContainer = styled.View`
  margin: ${p => p.theme.paddings.small};
`;

export default function FeedScreen() {
  const dispatch = useDispatch();

  const getCatFact = () => dispatch(actions.profile.request({}));

  const profileData = useSelector<AppState, global.profile.Selectors>(
    ({ profile }) => selectors.profile(profile, {})
  );

  React.useEffect(() => {
    getCatFact();
  }, []);

  return (
    <Container modifiers="padded">
      <HeroOne
        size="small"
        heading="Feed"
        info="Pull down to get a new amazing Cat Fact!"
      />
      <ScrollView
        refreshControl={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <RefreshControl
            refreshing={profileData.status.loading || false}
            onRefresh={getCatFact}
            colors={[theme.colors.primary.main]}
            tintColor={theme.colors.grayLight.main}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <StyledImage source={images.kitten} />
        <FactContainer>
          <Text>{profileData.data.getText}</Text>
        </FactContainer>
        <FlatButton
          title="Go to cart"
          onPress={() => navigate(routeConstants.TAB_CART)}
        />
      </ScrollView>
    </Container>
  );
}
