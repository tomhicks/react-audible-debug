import { createSoundEmitter, emitSoundsWhenMutated } from "audible-debug";
import React, { useEffect } from "react";

/**
 * Emits sounds when the DOM element, and all descendants are mutated.
 *
 * @param element A DOM Node, usually obtained as ref.current from <div ref={ref} />
 */
export function useAudibleDomMutations(element?: Node | null) {
  useEffect(() => {
    if (!element) return;
    return emitSoundsWhenMutated(element);
  }, [element]);
}

/**
 * CAUTION: This monkeypatches React to override the createElement function
 * in order to make sound on every React render call.
 *
 * @param enabled Whether or not to emit sound when React renders components
 */
export function useAudibleRenders(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let run = true;
    const oldCreateElement = React.createElement;
    const blip = createSoundEmitter();
    let calls = 0;

    function step() {
      if (calls > 0) {
        blip(calls);
        calls = 0;
      }

      if (run) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    React.createElement = function () {
      calls++;
      return oldCreateElement.apply(this, arguments);
    };

    return () => {
      run = false;
      React.createElement = oldCreateElement;
    };
  }, [enabled]);
}
