import React from 'react';
import '../styles/App.css';
import {
  majorScale,
  Heading,
  Pane,
  Text,
} from 'evergreen-ui';

import List from './List';

const Attribution = () =>
  <Text
    size={300}
    color="muted"
    textAlign="center"
    justifySelf="center"
    marginTop={majorScale(1)}
  >
    Data and logo are property of Wine Spectator/M. Shanken Communciations.
  </Text>

const App = () => {
  return (
    <Pane
      margin={majorScale(2)}
      height="95vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        size={900}
        textAlign="left"
        alignSelf="flex-start"
        marginBottom={majorScale(1)}
      >
        Wine Spectator's Top 100
      </Heading>
      <List />
      <Attribution />
    </Pane>
  );
}

export default App;
