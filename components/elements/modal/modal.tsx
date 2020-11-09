import React, { ReactChild, useRef, useEffect } from 'react';
import Modalize from 'react-native-modalize';

import Content from './styled';

type Props = {
  onClose: () => void;
  isVisible: boolean;
  children: ReactChild | ReactChild[];
};

const ModalComponent = ({ onClose, isVisible, children }: Props) => {
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (modalRef && modalRef.current) {
      if (isVisible) {
        modalRef.current.open();
      } else {
        modalRef.current.close();
      }
    }
  }, [isVisible]);

  return (
    <Modalize
      adjustToContentHeight
      modalStyle={{}}
      ref={modalRef}
      onClose={onClose}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'always'
      }}
    >
      <Content>{children}</Content>
    </Modalize>
  );
};

export { ModalComponent };
