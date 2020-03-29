import React, { useState, useEffect,useRef } from 'react';
import { View } from 'react-native';

const DisappearDelay =({isShowing, style, children} )=> {
  const [show, setShow] = useState(false); // Initial value for opacity: 0

  useEffect(() => {

      let interval;
      if (isShowing){
          setShow(true)
      }else{
          interval = setInterval(()=>{
            setShow(false)
         },500);
      }

      return ()=>clearInterval(interval);

  }, [isShowing]);

  return (
    show&&<View style={style}>
      {children}
    </View>
  );
};

export default DisappearDelay;