type Props = {
  accuracy: string;
  correctKeystroke: number;
  correctWords: number;
  totalKeystroke: number;
  wpm: number;
  wrongKeystroke: number;
  wrongWords: number;
};

const Result = ({
  accuracy,
  correctKeystroke,
  correctWords,
  totalKeystroke,
  wpm,
  wrongKeystroke,
  wrongWords,
}: Props) => {
  return (
    <div className="w-80 border border-solid border-gray-200 rounded-lg">
      <p className="p-3 text-xl font-medium bg-teal-500 text-center rounded-t-lg">
        Result
      </p>
      <div className="text-center p-1">
        <h1 className="text-teal-500 text-4xl font-bold">{wpm} KPM</h1>
        <p className="text-gray-500">(kata per menit)</p>
      </div>
      <div className="flex justify-between bg-gray-200 p-3">
        <span>Akurasi</span>
        <span>{accuracy}%</span>
      </div>
      <div className="flex justify-between p-3">
        <span>Keystroke</span>
        <span>
          (<span className="text-green-600">{correctKeystroke} </span>|
          <span className="text-red-600"> {wrongKeystroke}</span>) {totalKeystroke}
        </span>
      </div>
      <div className="flex justify-between bg-gray-200 p-3">
        <span>Kata yang benar</span>
        <span className="text-green-600">{correctWords}</span>
      </div>
      <div className="flex justify-between p-3">
        <span>Kata yang salah</span>
        <span className="text-red-600">{wrongWords}</span>
      </div>
    </div>
  );
};

export default Result;
