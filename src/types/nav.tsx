
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Public: undefined;
  CreateAcc: undefined;
  ProductDetails: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  CompositeScreenProps<BottomTabScreenProps<RootDrawerParamList, T>, RootStackScreenProps<keyof RootStackParamList>>;