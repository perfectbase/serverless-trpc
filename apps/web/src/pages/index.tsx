import type { NextPage } from 'next'
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['test.hello']);
  if (hello.error) {
    return <div>Error: {hello.error.message}</div>;
  }
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {hello.data.greeting}
    </div>
  )
}

export default Home
