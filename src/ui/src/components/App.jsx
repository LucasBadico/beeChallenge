import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default function App({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.object
}