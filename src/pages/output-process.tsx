import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { OutputView } from 'src/sections/overview/view/output-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Output - ${CONFIG.appName}`}</title>
      </Helmet>

      <OutputView />
    </>
  );
}
