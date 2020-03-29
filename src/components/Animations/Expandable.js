import React, { useState, useEffect,useRef } from 'react';
import { Animated } from 'react-native';

const Expandable =({goDown, startPosn, endPosn, style, children} )=> {
  const [expandingAnim] = useState(new Animated.Value(goDown? startPosn: endPosn)); // Initial value for opacity: 0
   const [hasActivated, setHasActivated] = useState(false);

  useEffect(() => {

      if ((!hasActivated) && goDown){
          setHasActivated(true)
      }


      if (goDown){
          Animated.timing(expandingAnim, {
          toValue: endPosn,
          duration: 300,
        }).start();
      }else{
          Animated.timing(expandingAnim, {
          toValue: startPosn,
          duration: 300,
        }).start();
      }

  }, [goDown]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        top: hasActivated? expandingAnim: startPosn, // Bind opacity to animated value
          position:'absolute'
      }}>
      {children}
    </Animated.View>
  );
};

export default Expandable;