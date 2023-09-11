import { useEffect, useMemo, useRef, useState } from 'react';
import { INDONESIAN_WORDS, MAX_WORDS } from './constants/words';
import Result from './components/Result';
import Header from './components/Header';
import Timer from './components/Timer';
import WordBox from './components/WordBox';
import shuffleWords from './utils/shuffleWords';

function App() {
  
  const timeRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [words, setWords] = useState<string[]>(shuffleWords(INDONESIAN_WORDS, MAX_WORDS));
  const [inputWord, setInputWord] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [wrongWords, setWrongWords] = useState<number>(0);
  const [isInputCorrect, setIsInputCorrect] = useState(true);

  const [correctKeystroke, setCorrectKeystroke] = useState<number>(0);
  const [wrongKeystroke, setWrongKeystroke] = useState<number>(0);

  const [correctionCount, setCorrectionCount] = useState<number>(0);

  const currentWord = useMemo(() => words[0], [words]);

  console.log('ori', INDONESIAN_WORDS);
  console.log('words state', words);

  const totalKeyStroke = useMemo(
    () => correctKeystroke + wrongKeystroke,
    [correctKeystroke, wrongKeystroke]
  );

  const accuracy = useMemo(
    () => (correctKeystroke * 100) / (totalKeyStroke + correctionCount),
    [correctKeystroke, totalKeyStroke, correctionCount]
  );

  const wpm = useMemo(
    () => Math.round(correctKeystroke / 5),
    [correctKeystroke]
  );

  const handleTimer = () => {
    let timesLeft = timer;

    timeRef.current = setInterval(() => {
      timesLeft -= 1;
      setTimer((prevTimer) => prevTimer - 1);

      if (timesLeft <= 0) {
        clearInterval(timeRef.current);
      }
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key.length === 1 && key !== ' ') {
      if (totalKeyStroke === 0) {
        handleTimer();
        console.log('start timer');
      }

      if (isInputCorrect) {
        setCorrectKeystroke((prevCorrectKeystroke) => prevCorrectKeystroke + 1);
      } else {
        setWrongKeystroke((prevWrongKeystroke) => prevWrongKeystroke + 1);
      }
    }

    if (key === 'Backspace') {
      setCorrectionCount((prevCorrectionCount) => prevCorrectionCount + 1);
    }
  };

  const submitWord = (input: string) => {
    setInputWord(input);

    if (input.endsWith(' ')) {
      setInputWord('');
    }

    if (!input.trim().length) return;

    if (input.trim() !== currentWord.slice(0, input.length)) {
      setIsInputCorrect(false);
    } else {
      setIsInputCorrect(true);
    }

    // jika sudah sampai char terakhir di currentWord, maka tentukan count dari correct/wrong words;
    if (!input.endsWith(' ')) return;

    if (input.trim() === currentWord) {
      setCorrectWords((prevCorrectCount) => prevCorrectCount + 1);
    } else {
      setWrongWords((prevWrongCount) => prevWrongCount + 1);
    }

    setWords((prevWords) => prevWords.slice(1));
  };

  const handleReset = () => {
    clearInterval(timeRef.current);

    setTimer(60);
    setInputWord('');
    setWords(INDONESIAN_WORDS);
    setIsInputCorrect(true);

    setCorrectWords(0);
    setWrongWords(0);

    setCorrectKeystroke(0);
    setWrongKeystroke(0);

    setCorrectionCount(0);
  };

  useEffect(() => {
    const inputField = inputRef.current;
    inputField?.focus();
  }, []);

  return (
    <div className="px-4">
      <Header />

      <div className="flex flex-col items-center space-y-2 lg:flex-row lg:items-start lg:justify-center lg:space-y-0 lg:space-x-7">
        <div>
          <WordBox words={words} isInputCorrect={isInputCorrect} />

          <div className="flex flex-col items-center space-y-2 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-2 ">
            <input
              disabled={timer === 0}
              ref={inputRef}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => submitWord(e.target.value)}
              type="text"
              value={inputWord}
              placeholder="mulai ketik di sini..."
              className="h-14 w-full lg:w-2/3 text-xl border-2 border-teal-400 rounded-lg p-3 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-200"
            />
            <Timer timer={timer} onReset={handleReset} />
          </div>
        </div>

        {timer === 0 && (
          <Result
            accuracy={accuracy.toFixed()}
            correctKeystroke={correctKeystroke}
            correctWords={correctWords}
            totalKeystroke={totalKeyStroke}
            wpm={wpm}
            wrongKeystroke={wrongKeystroke}
            wrongWords={wrongWords}
          />
        )}
      </div>
    </div>
  );
}

export default App;

// console.log('is correct', isInputCorrect);
// console.log('length', input.length);

// console.log('input:', input, 'actual:', currentWord.slice(0, input.length));
