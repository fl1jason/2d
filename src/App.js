import React, {useState, useEffect} from 'react';
import './App.css';
import characters from './assets/chars/characters.json';

function App() {

  const SPEED = 150;
  const [step, setStep] = useState(1);
  const [action, setAction] = useState("idle");
  const [character, setCharacter] = useState("gatsby");
  const [maxFiles, setMaxFiles] = useState(8);
  const [keyPressed, setKeyPressed] = useState(false);

  const setNextStep = () => {
    const nextStep = (step === maxFiles ? 1 : step + 1);
    setStep(nextStep);
  }

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    console.log(key);

    let speed = 0;
    
    switch(key)
    {
    case "k":
      speed = 15;
      setAction("walk")
      break;
    case "l":
      speed = 5;
      setAction("run")
      break;
    case " ":
      speed = 10
      setAction("jump")
      break;
    default:
      speed = 0;
      setAction("idle")
      break;
    }

    document.documentElement.style.setProperty('--xValue', speed + 's')
    setKeyPressed(true);
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
      setKeyPressed(false);
  };

  const loadCharacters = () =>{
    return (characters.map(char => {return char.name}));
  }

  const loadActionsForCharacter = (char) =>{
    let character = characters.filter(c  => c.name === char);
    return (character[0].actions.map(action => {return action.name}));
  }

  useEffect(() => {
      setTimeout(function(){setNextStep()}, SPEED);
  }, [step]);

  useEffect(() => {
  if (!keyPressed)
  {
    document.documentElement.style.setProperty('--xValue', '0s')
    setAction('idle');
  }
  }, [keyPressed]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const charList = loadCharacters();
  const actionList = loadActionsForCharacter(character);

  const _onSelectCharacter = (item) => {
    setCharacter(item.value);
  }

  const _onSelectAction = (item) => {
    
    let res = characters.filter(a  => a.name === character);
    if (res[0]){
      let action = res[0].actions.filter(a  => a.name === item.value);
      setMaxFiles(action[0].files.length);
      setAction(item.value);
      setNextStep();  
    }
  }
  
  return (
    <div className="App">
      <div id="container">
        <div className="walk">
          <img src={require(`./assets/scenes/green.png`)} />
          <img src={require(`./assets/scenes/green.png`)} />
          <img src={require(`./assets/scenes/green.png`)} />
        </div>
      </div>

      <img src={require(`./assets/chars/${character}/${action}${step}.png`)} class="character" />        
    </div>
  );
}

export default App;
