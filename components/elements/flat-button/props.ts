import { ButtonSize, Colors } from '../../../theme';

export type ButtonProps = {
  title: string;
  size?: keyof ButtonSize;
  type?: keyof Colors;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};
