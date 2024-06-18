import { useState, useEffect } from 'react';
import '../App.css';
import './Duck.css';
import Duck from './Duck.jsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import FoundWords from './FoundWords';
import resetButton from '../assets/reset.svg'
import shuffleButton from '../assets/shuffle.svg'


const wordList = [
  'ACED', 'FADED', 'FADE', 'BADE', 'FACE', 'FACED', 'BAGGED', 'DABBED', 'DEAF', 'CAGE', 'CAGED'
];

function DuckMenu() {
  const [duckList, setDuckList] = useState([]);
  const [word, setWord] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [letters, setLetters] = useState([
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ]);

  const ducks = [
    { id: 'duck-0', letter: letters[0], center: true },
    { id: 'duck-1', letter: letters[1], center: false },
    { id: 'duck-2', letter: letters[2], center: false },
    { id: 'duck-3', letter: letters[3], center: false },
    { id: 'duck-4', letter: letters[4], center: false },
    { id: 'duck-5', letter: letters[5], center: false },
    { id: 'duck-6', letter: letters[6], center: false },
  ];

  useEffect(() => {
    console.log(foundWords);
    console.log(wordList.length, foundWords.length);
      if (wordList.length === foundWords.length) {
        console.log('you win');
        setStatusMessage('You win!');
      }
    }, [foundWords]);

  useEffect(() => {

      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }, [statusMessage]); 
    
    const undo = () => {
      setDuckList(prevDuckList => 
        prevDuckList.slice(0, -1)
      )
      setWord(prevWord =>
        prevWord.slice(0, -1)
      )
    }

    const shuffle = () => {
      let newLetters = [...letters].splice(1, letters.length - 1);
      console.log(newLetters);
  
      for (let i = newLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newLetters[i], newLetters[j]] = [newLetters[j], newLetters[i]];
      }
      console.log(newLetters);
      setLetters(prevLetters => [prevLetters[0], ...newLetters]);
    };

    const handleDuckClick = (duck) => {
      if (duckList.length >= 11) {
        setStatusMessage('word cannot exceed 11 letters');
        return;
      }
      setDuckList(prevDuckList => {
        const clonedDuck = { ...duck, id: uuidv4() };
        const newWord = [...duckList, clonedDuck].map(d => d.letter).join('');
        setWord(newWord);
        console.log(newWord);
        return [...prevDuckList, clonedDuck];
      });
    };

    useEffect(() => {
      function handleKeyDown(e) {
        const key = e.key.toUpperCase();
        const index = letters.indexOf(key);
        if (index !== -1) {
          handleDuckClick(ducks[index]);
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          console.log('undo')
          undo();
        } else if (e.key === 'Enter') {
          handleSubmit();
        }
      }
    
      document.addEventListener('keydown', handleKeyDown);
    
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, [handleDuckClick]);

  const onDragEnd = (result) => {
    console.log(duckList);
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.source.droppableId === 'duck-menu' && result.destination.droppableId === 'duck-line') {
      // clone duck and add to line
      const duckToClone = ducks[sourceIndex];
      const clonedDuck = { ...duckToClone, id: uuidv4() };
      const newDuckList = Array.from(duckList);
      newDuckList.splice(destinationIndex, 0, clonedDuck);
      if (newDuckList.length > 11 && duckList.length != newDuckList.length) {
        setStatusMessage('word cannot exceed 11 letters');
        return;
      } 
      setDuckList(newDuckList);
      const newWord = duckList.map(duck => duck.letter).join('');
      setWord(newWord);
      console.log(word);
    } else if (result.source.droppableId === 'duck-line' && result.destination.droppableId === 'duck-line') {
      // move duck
      const items = Array.from(duckList);
      const [movedDuck] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, movedDuck);
      setDuckList(items);
    }
  };

  const handleSubmit = () => {
    console.log(foundWords);
    if (word.length === 0) {
      return;
// **replace this with if word is in the dict subset
    } else if (word.length <= 3) {
      setStatusMessage('Too Short!');
    } else if (!word.includes(letters[0])) {
        setDuckList([]);
        setWord('');
        setStatusMessage('Missing center letter');
    } else if (wordList.indexOf(word) > -1) {
      if (foundWords.indexOf(word) != -1) {
        setDuckList([]);
        setWord('');
        setStatusMessage('Already found!');
        return;
      }
      setFoundWords(prevWords => [...prevWords, word]);
      setDuckList([]);
      setWord('');
      setStatusMessage('Good!');
      return;
    } else {
      setDuckList([]);
      setWord('');
      setStatusMessage('Not in word list');
    }
  };

  const reset = () => {
    setDuckList([]);
    setWord('');
    setFoundWords([]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <div className='container'>
          <img src={resetButton} className='button reset' onClick={reset}/>
          <FoundWords foundWords={foundWords}></FoundWords>
          <p className={`status-message ${statusMessage === '' ? 'empty' : ''}`}>{statusMessage}</p>
          <Droppable droppableId='duck-line' direction='horizontal'>
            {(provided) => (
              <div className='duck-line' {...provided.droppableProps} ref={provided.innerRef} style={{ display:'flex' }}>
                {duckList.map((duck, index) => (
                  <Draggable key={duck.id} draggableId={duck.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,
                          display: 'block',
                          marginLeft:'-6.4%',
                          marginRight:'-6.4%'
                        }}
                        className="duck-clone"
                      >
                        <Duck letter={duck.letter} center={duck.center}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId='duck-menu' isDropDisabled={true}>
            {(provided) => (
              <div className='duck-menu' {...provided.droppableProps} ref={provided.innerRef} >
                {ducks.map((duck, index) => (
                  <Draggable key={duck.id} draggableId={duck.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => handleDuckClick(duck)}
                      >
                        <Duck letter={duck.letter} center={duck.center} className={`duck ${duck.id}`} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className='bottom-bar'>
            <button className='button' onClick={() => undo()}>delete</button>
            <img src={shuffleButton} className='button shuffle' onClick={shuffle}/>
            <button className='button' onClick={handleSubmit}>enter</button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default DuckMenu;
