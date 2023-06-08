export const IsOnline = (setIsOnline:any) => {
    const handleOnline = () => {
      console.log('online')
      setIsOnline(true)};
    const handleOffline = () => {
      console.log('ofline')
      setIsOnline(false)};


    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
}