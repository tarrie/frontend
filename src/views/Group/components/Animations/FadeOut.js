import React, { useState } from 'react';
import { Animated } from 'react-native';

const FadeOut = props => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();

  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeOut;