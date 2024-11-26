import React from 'react';
import { CoreStore } from './CoreStore';

export class RootStore {
  coreStore: CoreStore<RootStore>;

  constructor() {
    this.coreStore = new CoreStore(this);
  }
}

const RootStoreContext = React.createContext(new RootStore());

export const useRootStore = () => React.useContext(RootStoreContext);
