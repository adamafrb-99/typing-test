type Props = {
  words: string[];
  isInputCorrect: boolean;
};

const WordBox = ({ words, isInputCorrect }: Props) => {
  return (
    <div className="bg-white shadow-lg leading-[3.5rem] p-4 max-h-32 overflow-hidden rounded-lg max-w-3xl border-2 border-teal-500 mb-5">
      <span className={`pb-1 font-medium text-2xl md:text-3xl lg:text-4xl px-1 rounded-lg ${isInputCorrect ? 'bg-teal-300' : 'bg-red-400'}`}>
        {words[0]}      
      </span>
      {words.slice(1).map((word: string, idx: number) => (
        <span key={`${idx}-${word}`} className='font-medium text-2xl md:text-3xl lg:text-4xl px-1'>{word} </span>
      ))}
    </div>
  );
};

export default WordBox;
