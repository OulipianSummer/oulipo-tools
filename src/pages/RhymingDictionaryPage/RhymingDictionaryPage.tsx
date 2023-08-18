import { IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonList, IonInput, IonLabel, IonButton, IonChip } from '@ionic/react';
import './RhymingDictionaryPage.css';
import { useState, useRef } from 'react';
import getThesaurusEntry from '../../word_apis/thesaurus';

const RhymingDictionaryPage: React.FC = () => {

  const name = 'Lipogram Rhyming Dictionary';

  const [inputModel, setInputModel] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const ionInputEl = useRef<HTMLIonInputElement>(null);

  const onSearchInput = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    setInputModel(filteredValue);

    const inputCmp = ionInputEl.current;
    if (inputCmp !== null) {
      inputCmp.value = filteredValue;
    }
  };

  // Clear the results pane.
  const clearResults = () => {

    if(synonyms.length > 0) {
      setSynonyms([]);
    }

    if(antonyms.length > 0) {
      setAntonyms([]);
    }
    

  }

  // TODO: Turn this into a global listener?
  const handleKeyPress = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit(); // Call the onSubmit function when Enter is pressed
    }
  };


  // Parse the thesaurus api results and filter out unneeded entries (some are empty string for some reason).
  const handleThesaurusResults = (data: any) => {
    if(data.synonyms.length > 0) {
      setSynonyms(data.synonyms.filter((ele: string) => {
        return ele !== "";
      }));
    }

    if(data.antonyms.length > 0) {
      setAntonyms(data.antonyms.filter((ele: string) => {
        return ele !== "";
      }));
    }
  }


  // Handle when the form is submitted.
  const onSubmit = (event?: any) => {

    clearResults();

    getThesaurusEntry(inputModel)
    .then((data:any) => handleThesaurusResults(data))
    .catch((e: any) => console.log(e));


  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Word
              <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput     
            clearInput={true}  
            value={inputModel} 
            onIonInput={onSearchInput}
            onKeyUp={handleKeyPress}
            ref={ionInputEl}>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonButton onClick={onSubmit}>Search</IonButton>
          </IonItem>
        </IonList>


        <div className="results">

          { synonyms.length > 0 &&
            <div className="synonyms">
              <p>Synonyms</p>
              {synonyms.map((item, idx) => {
                return (<IonChip key={`synonym-${idx}`}>{item}</IonChip>);
              })}
            </div>
          }

          { antonyms.length > 0 &&
            <div className="antonyms">
              <p>Antonyms</p>
              {antonyms.map((item, idx) => {
                return(<IonChip key={`antonym-${idx}`}>{item}</IonChip>);
              })}
            </div>
          }

        </div>

      </IonContent>
    </IonPage>
  );
};

export default RhymingDictionaryPage;
