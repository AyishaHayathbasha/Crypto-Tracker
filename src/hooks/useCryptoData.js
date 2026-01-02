import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptos } from '../store/slices/cryptoSlice';

export function useCryptoData() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector(state => state.crypto);
  
  useEffect(() => {
    dispatch(fetchCryptos());
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptos());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  const refresh = () => {
    dispatch(fetchCryptos());
  };
  
  return { coins, loading, error, refresh };
}
