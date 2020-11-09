import * as React from 'react';
import styled from 'styled-components/native';

import { HeroOne, Container, TextInput, FlatButton } from '../components';
import { sendLocalNotification } from '../services/notification';
import { goBack } from '../navigation/navigation-service';

const InputContainer = styled.View`
  padding-vertical: 10px;
`;

export default function ProfileScreen() {
  return (
    <Container modifiers="padded">
      <HeroOne
        size="small"
        heading="Registrati"
        info="Diventa utente e fai cose"
      />
      <InputContainer>
        <TextInput
          autoCompleteType="name"
          onChange={() => {}}
          value={undefined}
          labelText="Username"
          // onFocus={handleFirstNameFocus}
          // onBlur={handleFirstNameBlur}
          // error={firstNameState.error}
          // errorMessage={firstNameState.errorMessage}
          // fieldActive={firstNameState.active}
          // fieldFocus={firstNameState.focused}
          returnKeyType="done"
          // inputRef={nameRef}
          testID="input-first-name"
        />
        <TextInput
          autoCompleteType="name"
          onChange={() => {}}
          value={undefined}
          labelText="Password"
          // onFocus={handleLastNameFocus}
          // onBlur={handleLastNameBlur}
          // error={lastNameState.error}
          // errorMessage={lastNameState.errorMessage}
          // fieldActive={lastNameState.active}
          // fieldFocus={lastNameState.focused}
          returnKeyType="done"
          testID="input-last-name"
        />
      </InputContainer>
      <FlatButton
        title="Registrati"
        onPress={() => {
          goBack();
          sendLocalNotification({
            type: 'success',
            body: 'Ti sei registrato. Bravo!'
          });
        }}
      />
    </Container>
  );
}
