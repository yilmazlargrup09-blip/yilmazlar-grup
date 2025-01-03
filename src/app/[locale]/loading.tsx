import LoadingScreen from '@/components/LoadingScreen'

export default function Loading() {
  // This artificial delay will make the loading state more noticeable
  // Remove this in production
  if (process.env.NODE_ENV === 'development') {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    delay(2000);
  }

  return <LoadingScreen />
}