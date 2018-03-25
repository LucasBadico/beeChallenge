import 'rxjs'

import { race } from 'rxjs/observable/race'
import { timer } from 'rxjs/observable/timer'

const reports = action$ => action$
  .ofType(EPT_CALL_OPEN_N_M)
  .mergeMap(action =>
    race(
      timer(2000).mapTo({ type: OPEN_N_M }),
      action$.ofType(EPT_CANCEL_OPEN_N_M)
        .take(1),
    ),
)

export default reports