const shuffleWords = (words: string[], maxWords: number) => {
  const shuffled = words.slice(0);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, maxWords);
};

export default shuffleWords;
