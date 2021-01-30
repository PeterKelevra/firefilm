import useStores from './useStores';

export default function useUser() {
  const { sessionStore } = useStores();
  return sessionStore?.user;
}
