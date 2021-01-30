import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react';

export default function useStores() {
  return useContext(MobXProviderContext);
}
