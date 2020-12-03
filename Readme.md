# 🎧 `react-audible-debug` - audible debugging of React applications

## Usage

### `useAudibleRenders`: makes sounds when React renders

Place this _once_ in your app, at the top level. You can use the `enabled`
parameter to enable and disable it programatically.

The more calls there are to `React.createElement`, the higher the pitch of
the sound. This allows you to listen to roughly how much work React is doing
and when.

```javascript
import { useAudibleRenders } from "react-audible-debug";

function MyApp() {
  const enabled = true;

  // now, whenever
  useAudibleRenders(enabled);

  return <MyEntireApp />;
}
```

### `useAudibleDomMutations`: makes sounds when the DOM is mutated

Use this hook wherever you want to hear DOM mutations. You can place this in
multiple places throughout your app.

The more changes there are to your DOM node, the higher the pitch of the sound
emitted.

```javascript
import { useAudibleDomMutations } from "react-audible-debug";

function MyComponent() {
  const elementToObserveRef = React.useRef(null);

  // now, whenever anything inside the div is changed, you will hear sounds
  // corresponding to the number of mutations
  useAudibleDomMutations(elementToObserveRef.current);

  return (
    <div ref={elementToObserveRef}>
      <MyComplexComponent />
    </div>
  );
}
```

## Motivation

When we're building interactive apps, sometimes it's useful to know when something has
changed in the DOM. You might find that you've got a runaway timer, or you're making more
changes to the DOM than necessary which could cause performance issues.

By listening to our apps, we can put our ears to use as a spare information stream for our
debugging.
