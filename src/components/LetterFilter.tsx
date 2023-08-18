import { IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import React from 'react';

interface FilterOptionnterface {
    title: string,
    value: any
}

interface LetterFilterProps {
    valueCallback: Function,
    title: String
}


const LetterFilter: React.FC<LetterFilterProps> = (props: LetterFilterProps) => {

      const letterFilters: Array<FilterOptionnterface> = [...Array(26).keys()].map((n) => {
        return(
          {
            title: String.fromCharCode(65 + n),
            value: String.fromCharCode(97 + n)
          }
        );
      });

      const onChange = (value: any) => {
        props.valueCallback(value);
      }

    return(
        <React.Fragment>
        <IonLabel position="floating">
         {props.title}
        </IonLabel>
        <IonSelect onIonChange={(e) => onChange(e.detail.value)} multiple={true}>
            {letterFilters.map((ele) => {
              return(
                <IonSelectOption value={ele.value}>
                { ele.title }
                </IonSelectOption>
              );
            })}
        </IonSelect>
        </React.Fragment>
    );

}

export default LetterFilter;