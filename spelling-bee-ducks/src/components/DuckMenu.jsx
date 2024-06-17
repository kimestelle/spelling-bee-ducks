import { useState, useEffect } from 'react';
import '../App.css';
import './Duck.css';
import Duck from './Duck.jsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G'
];

const ducks = [
  { id: 'duck-0', letter: letters[0], center: true },
  { id: 'duck-1', letter: letters[1], center: false },
  { id: 'duck-2', letter: letters[2], center: false },
  { id: 'duck-3', letter: letters[3], center: false },
  { id: 'duck-4', letter: letters[4], center: false },
  { id: 'duck-5', letter: letters[5], center: false },
  { id: 'duck-6', letter: letters[6], center: false },
];

function DuckMenu() {
  const [duckList, setDuckList] = useState([]);
  const [word, setWord] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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
    }

    const handleDuckClick = (duck) => {
      if (duckList.length >= 11) {
        setStatusMessage('word cannot exceed 11 letters');
        return;
      }
      const clonedDuck = { ...duck, id: uuidv4() };
      setDuckList([...duckList, clonedDuck]);
      const newWord = [...duckList, clonedDuck].map(d => d.letter).join('');
      setWord(newWord);
      console.log(newWord);
    };

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

  const setLetter = (duckId, newLetter) => {
    setDuckList((prevDuckList) => {
      if (prevDuckList.length > 10) {
        return prevDuckList; 
      }
      
      return prevDuckList.map((duck) =>
        duck.id === duckId ? { ...duck, letter: newLetter } : duck
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <div className='container'>
          <p className='status-message'>{statusMessage}</p>
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
                          marginLeft:'-5.8%',
                          marginRight:'-5.8%'
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
              <div className='duck-menu' {...provided.droppableProps} ref={provided.innerRef}>
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
        </div>
        <button className='button' onClick={() => setLetter('duck-0', 'Z')}>Change Duck 0 to Z</button>
        <button className='undo-button' onClick={() => undo()}>Undo</button>
      </div>
    </DragDropContext>
  );
}

export default DuckMenu;
