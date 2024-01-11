import { Suspense } from 'react';
import Documents from './components/documents';

export default function App (): JSX.Element {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Documents />
      </Suspense>
    )
}
