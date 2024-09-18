import * as Progress from '@radix-ui/react-progress';

export default function InitLoading({progress}){
    return (
        <Progress.Root
          value={progress}
          className="relative overflow-hidden bg-gray-200 w-64 h-4 rounded"
        >
          <Progress.Indicator
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          />
        </Progress.Root>
      );
}
