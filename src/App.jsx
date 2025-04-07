import React, { useState, useEffect, useCallback } from 'react';

const hiraganaData = [
  { id: 'h1', char: 'あ', romaji: 'a', example: { word: 'あさ', meaning: 'morning' } },
  { id: 'h2', char: 'い', romaji: 'i', example: { word: 'いぬ', meaning: 'dog' } },
  { id: 'h3', char: 'う', romaji: 'u', example: { word: 'うみ', meaning: 'sea' } },
  { id: 'h4', char: 'え', romaji: 'e', example: { word: 'えき', meaning: 'station' } },
  { id: 'h5', char: 'お', romaji: 'o', example: { word: 'おちゃ', meaning: 'tea' } },
  { id: 'h6', char: 'か', romaji: 'ka', example: { word: 'かさ', meaning: 'umbrella' } },
  { id: 'h7', char: 'き', romaji: 'ki', example: { word: 'きって', meaning: 'stamp' } },
  { id: 'h8', char: 'く', romaji: 'ku', example: { word: 'くつ', meaning: 'shoes' } },
  { id: 'h9', char: 'け', romaji: 'ke', example: { word: 'けむし', meaning: 'caterpillar' } },
  { id: 'h10', char: 'こ', romaji: 'ko', example: { word: 'こども', meaning: 'child' } },
  { id: 'h11', char: 'さ', romaji: 'sa', example: { word: 'さかな', meaning: 'fish' } },
  { id: 'h12', char: 'し', romaji: 'shi', example: { word: 'しお', meaning: 'salt' } },
  { id: 'h13', char: 'す', romaji: 'su', example: { word: 'すし', meaning: 'sushi' } },
  { id: 'h14', char: 'せ', romaji: 'se', example: { word: 'せなか', meaning: 'back (body)' } },
  { id: 'h15', char: 'そ', romaji: 'so', example: { word: 'そら', meaning: 'sky' } },
  { id: 'h16', char: 'た', romaji: 'ta', example: { word: 'たかい', meaning: 'tall/expensive' } },
  { id: 'h17', char: 'ち', romaji: 'chi', example: { word: 'ちいさい', meaning: 'small' } },
  { id: 'h18', char: 'つ', romaji: 'tsu', example: { word: 'つくえ', meaning: 'desk' } },
  { id: 'h19', char: 'て', romaji: 'te', example: { word: 'てがみ', meaning: 'letter' } },
  { id: 'h20', char: 'と', romaji: 'to', example: { word: 'とり', meaning: 'bird' } },
  { id: 'h21', char: 'な', romaji: 'na', example: { word: 'なまえ', meaning: 'name' } },
  { id: 'h22', char: 'に', romaji: 'ni', example: { word: 'にく', meaning: 'meat' } },
  { id: 'h23', char: 'ぬ', romaji: 'nu', example: { word: 'ぬの', meaning: 'cloth' } },
  { id: 'h24', char: 'ね', romaji: 'ne', example: { word: 'ねこ', meaning: 'cat' } },
  { id: 'h25', char: 'の', romaji: 'no', example: { word: 'のり', meaning: 'seaweed' } },
  { id: 'h26', char: 'は', romaji: 'ha', example: { word: 'はな', meaning: 'flower/nose' } },
  { id: 'h27', char: 'ひ', romaji: 'hi', example: { word: 'ひこうき', meaning: 'airplane' } },
  { id: 'h28', char: 'ふ', romaji: 'fu', example: { word: 'ふね', meaning: 'ship' } },
  { id: 'h29', char: 'へ', romaji: 'he', example: { word: 'へや', meaning: 'room' } },
  { id: 'h30', char: 'ほ', romaji: 'ho', example: { word: 'ほし', meaning: 'star' } },
  { id: 'h31', char: 'ま', romaji: 'ma', example: { word: 'まど', meaning: 'window' } },
  { id: 'h32', char: 'み', romaji: 'mi', example: { word: 'みみ', meaning: 'ear' } },
  { id: 'h33', char: 'む', romaji: 'mu', example: { word: 'むし', meaning: 'insect' } },
  { id: 'h34', char: 'め', romaji: 'me', example: { word: 'めがね', meaning: 'glasses' } },
  { id: 'h35', char: 'も', romaji: 'mo', example: { word: 'もも', meaning: 'peach' } },
  { id: 'h36', char: 'や', romaji: 'ya', example: { word: 'やま', meaning: 'mountain' } },
  { id: 'h37', char: 'ゆ', romaji: 'yu', example: { word: 'ゆき', meaning: 'snow' } },
  { id: 'h38', char: 'よ', romaji: 'yo', example: { word: 'よる', meaning: 'night' } },
  { id: 'h39', char: 'ら', romaji: 'ra', example: { word: 'らくだ', meaning: 'camel' } },
  { id: 'h40', char: 'り', romaji: 'ri', example: { word: 'りんご', meaning: 'apple' } },
  { id: 'h41', char: 'る', romaji: 'ru', example: { word: 'るす', meaning: 'absent' } },
  { id: 'h42', char: 'れ', romaji: 're', example: { word: 'れきし', meaning: 'history' } },
  { id: 'h43', char: 'ろ', romaji: 'ro', example: { word: 'ろうそく', meaning: 'candle' } },
  { id: 'h44', char: 'わ', romaji: 'wa', example: { word: 'わたし', meaning: 'I/me' } },
  { id: 'h45', char: 'を', romaji: 'wo', example: { word: '(particle)', meaning: 'object marker' } },
  { id: 'h46', char: 'ん', romaji: 'n', example: { word: 'でんわ', meaning: 'telephone' } },
];

const katakanaData = [
  { id: 'k1', char: 'ア', romaji: 'a', example: { word: 'アメリカ', meaning: 'America' } },
  { id: 'k2', char: 'イ', romaji: 'i', example: { word: 'インド', meaning: 'India' } },
  { id: 'k3', char: 'ウ', romaji: 'u', example: { word: 'ウイスキー', meaning: 'whiskey' } },
  { id: 'k4', char: 'エ', romaji: 'e', example: { word: 'エアコン', meaning: 'air conditioner' } },
  { id: 'k5', char: 'オ', romaji: 'o', example: { word: 'オレンジ', meaning: 'orange' } },
  { id: 'k6', char: 'カ', romaji: 'ka', example: { word: 'カメラ', meaning: 'camera' } },
  { id: 'k7', char: 'キ', romaji: 'ki', example: { word: 'キロ', meaning: 'kilo' } },
  { id: 'k8', char: 'ク', romaji: 'ku', example: { word: 'クラス', meaning: 'class' } },
  { id: 'k9', char: 'ケ', romaji: 'ke', example: { word: 'ケーキ', meaning: 'cake' } },
  { id: 'k10', char: 'コ', romaji: 'ko', example: { word: 'コーヒー', meaning: 'coffee' } },
  { id: 'k11', char: 'サ', romaji: 'sa', example: { word: 'サービス', meaning: 'service' } },
  { id: 'k12', char: 'シ', romaji: 'shi', example: { word: 'シャツ', meaning: 'shirt' } },
  { id: 'k13', char: 'ス', romaji: 'su', example: { word: 'スープ', meaning: 'soup' } },
  { id: 'k14', char: 'セ', romaji: 'se', example: { word: 'セーター', meaning: 'sweater' } },
  { id: 'k15', char: 'ソ', romaji: 'so', example: { word: 'ソース', meaning: 'sauce' } },
  { id: 'k16', char: 'タ', romaji: 'ta', example: { word: 'タクシー', meaning: 'taxi' } },
  { id: 'k17', char: 'チ', romaji: 'chi', example: { word: 'チーズ', meaning: 'cheese' } },
  { id: 'k18', char: 'ツ', romaji: 'tsu', example: { word: 'ツアー', meaning: 'tour' } },
  { id: 'k19', char: 'テ', romaji: 'te', example: { word: 'テスト', meaning: 'test' } },
  { id: 'k20', char: 'ト', romaji: 'to', example: { word: 'トマト', meaning: 'tomato' } },
  { id: 'k21', char: 'ナ', romaji: 'na', example: { word: 'ナイフ', meaning: 'knife' } },
  { id: 'k22', char: 'ニ', romaji: 'ni', example: { word: 'ニュース', meaning: 'news' } },
  { id: 'k23', char: 'ヌ', romaji: 'nu', example: { word: 'ヌードル', meaning: 'noodle' } },
  { id: 'k24', char: 'ネ', romaji: 'ne', example: { word: 'ネクタイ', meaning: 'necktie' } },
  { id: 'k25', char: 'ノ', romaji: 'no', example: { word: 'ノート', meaning: 'notebook' } },
  { id: 'k26', char: 'ハ', romaji: 'ha', example: { word: 'ハンバーガー', meaning: 'hamburger' } },
  { id: 'k27', char: 'ヒ', romaji: 'hi', example: { word: 'ビール', meaning: 'beer' } },
  { id: 'k28', char: 'フ', romaji: 'fu', example: { word: 'フォーク', meaning: 'fork' } },
  { id: 'k29', char: 'ヘ', romaji: 'he', example: { word: 'ヘリコプター', meaning: 'helicopter' } },
  { id: 'k30', char: 'ホ', romaji: 'ho', example: { word: 'ホテル', meaning: 'hotel' } },
  { id: 'k31', char: 'マ', romaji: 'ma', example: { word: 'マスク', meaning: 'mask' } },
  { id: 'k32', char: 'ミ', romaji: 'mi', example: { word: 'ミルク', meaning: 'milk' } },
  { id: 'k33', char: 'ム', romaji: 'mu', example: { word: 'チーム', meaning: 'team' } },
  { id: 'k34', char: 'メ', romaji: 'me', example: { word: 'メール', meaning: 'mail' } },
  { id: 'k35', char: 'モ', romaji: 'mo', example: { word: 'メモ', meaning: 'memo' } },
  { id: 'k36', char: 'ヤ', romaji: 'ya', example: { word: 'タイヤ', meaning: 'tire' } },
  { id: 'k37', char: 'ユ', romaji: 'yu', example: { word: 'ユーモア', meaning: 'humor' } },
  { id: 'k38', char: 'ヨ', romaji: 'yo', example: { word: 'ヨーグルト', meaning: 'yogurt' } },
  { id: 'k39', char: 'ラ', romaji: 'ra', example: { word: 'ラジオ', meaning: 'radio' } },
  { id: 'k40', char: 'リ', romaji: 'ri', example: { word: 'リスト', meaning: 'list' } },
  { id: 'k41', char: 'ル', romaji: 'ru', example: { word: 'ルール', meaning: 'rule' } },
  { id: 'k42', char: 'レ', romaji: 're', example: { word: 'レストラン', meaning: 'restaurant' } },
  { id: 'k43', char: 'ロ', romaji: 'ro', example: { word: 'ロボット', meaning: 'robot' } },
  { id: 'k44', char: 'ワ', romaji: 'wa', example: { word: 'ワイン', meaning: 'wine' } },
  { id: 'k45', char: 'ヲ', romaji: 'wo', example: { word: '(rarely used)', meaning: 'rare katakana wo' } },
  { id: 'k46', char: 'ン', romaji: 'n', example: { word: 'パン', meaning: 'bread' } },
];

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; 

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}


const styles = `
:root {
  --primary: #007bff;
  --primary-hover: #0056b3;
  --secondary: #28a745;
  --secondary-hover: #218838;
  --disabled: #6c757d;
  --card-front: #ffffff;
  --card-back: #eef2f7;
  --text-dark: #212529;
  --text-muted: #495057;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f4f7f6;
  line-height: 1.6;
  color: #333;
  min-height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-wrapper {
  max-width: 800px;     
  margin: 0 auto;
  padding: 2rem;
}

.flashcard-app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

/* Flashcard Container */
.flashcard-container {
  width: 100%;
  max-width: 350px;
  height: 500px;
  perspective: 1000px;
  margin: 1.5rem auto;
}

.flashcard {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 12px;
}

.card-front {
  background-color: var(--card-front);
  color: var(--text-dark);
  border: 1px solid #e0e0e0;
}

.card-back {
  background-color: var(--card-back);
  color: var(--text-muted);
  transform: rotateY(180deg);
}

/* Content Styling */
.character {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.romaji {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.example {
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.5;
  max-width: 80%;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  background-color: var(--disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.shuffle-button {
  background-color: var(--secondary);
}

.shuffle-button:hover:not(:disabled) {
  background-color: var(--secondary-hover);
}

.navigation span {
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  min-width: 80px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-style: italic;
  color: var(--disabled);
  font-size: 1.2rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .flashcard-container {
    height: 450px;
    max-width: 320px;
  }
  
  .character {
    font-size: 4.5rem;
  }
  
  .romaji {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  .flashcard-container {
    height: 400px;
    max-width: 300px;
  }
  
  .character {
    font-size: 4rem;
  }
  
  .romaji {
    font-size: 1.6rem;
  }
  
  .example {
    font-size: 1rem;
  }
  
  button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .controls, .navigation {
    gap: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .flashcard-container {
    max-width: 400px;
    height: 550px;
  }
  
  .character {
    font-size: 6rem;
  }
  
  .romaji {
    font-size: 2.5rem;
  }
}
`;

function Flashcard({ cardData }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [cardData]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (!cardData) {
    return <div className="flashcard-container loading">Loading card...</div>;
  }

  return (
    <div className="flashcard-container" onClick={handleClick} role="button" tabIndex="0" aria-label={`Flashcard for ${cardData.char}, click to flip`}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <span className="character">{cardData.char}</span>
        </div>
        <div className="card-face card-back">
          <div className="romaji">{cardData.romaji}</div>
          {cardData.example && (
            <div className="example">
              {cardData.example.word} <br /> ({cardData.example.meaning})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentDataSet, setCurrentDataSet] = useState('hiragana');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const shuffleAndSetCards = useCallback((dataSet) => {
    const data = dataSet === 'hiragana' ? hiraganaData : katakanaData;
    setCards(shuffleArray(data));
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    shuffleAndSetCards(currentDataSet);
  }, [currentDataSet, shuffleAndSetCards]);

  const showNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const showPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const setHiragana = () => setCurrentDataSet('hiragana');
  const setKatakana = () => setCurrentDataSet('katakana');

  const handleShuffleClick = () => {
      shuffleAndSetCards(currentDataSet);
  };

  return (
    <div className="app-wrapper">

    <div className="flashcard-app">
      <style>{styles}</style>

      <h1>Japanese Kana Flashcards</h1>

      <div className="controls">
        <button
          onClick={setHiragana}
          disabled={currentDataSet === 'hiragana'}
        >
          Hiragana
        </button>
        <button
          onClick={setKatakana}
          disabled={currentDataSet === 'katakana'}
        >
          Katakana
        </button>
        <button onClick={handleShuffleClick} className="shuffle-button" disabled={cards.length === 0}>
            Shuffle Deck
        </button>
      </div>

      {cards.length > 0 && currentIndex < cards.length ? (
        <Flashcard key={cards[currentIndex]?.id || currentIndex} cardData={cards[currentIndex]} />
      ) : (
        <div className="flashcard-container loading">Loading deck...</div>
      )}


      <div className="navigation">
        <button onClick={showPreviousCard} disabled={cards.length <= 1}>Previous</button>
        <span>{cards.length > 0 ? `${currentIndex + 1} / ${cards.length}` : '0 / 0'}</span>
        <button onClick={showNextCard} disabled={cards.length <= 1}>Next</button>
      </div>
    </div>
    </div>
  );
}

export default App;
