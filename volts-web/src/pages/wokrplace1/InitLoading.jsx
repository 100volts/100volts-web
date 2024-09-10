import * as Progress from '@radix-ui/react-progress';
import React from 'react';

export default function InitLoading({progress}){

    console.log(progress)
    return (
        <Progress.Root  value={progress}>
          <Progress.Indicator/>
        </Progress.Root>
    );
}
