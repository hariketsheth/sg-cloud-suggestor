import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProcessView } from 'src/sections/process/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Process - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProcessView />
    </>
  );
}
