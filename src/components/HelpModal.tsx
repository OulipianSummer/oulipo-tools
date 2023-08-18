import { IonButton, IonIcon, IonAlert, useIonModal, IonModal } from "@ionic/react"
import { helpCircleOutline, helpCircleSharp } from "ionicons/icons";
import React, { useState } from 'react';

interface HelpModalInterface {
    title: string,
    subHeader: string,
    message: string,
}

const HelpModal: React.FC<HelpModalInterface> = (props) => {

    const [present, dismisss] = useIonModal(IonModal, {

    });

    return(
      <IonButton onClick={(e) => present()} color="secondary">
          <IonIcon ios={helpCircleOutline} md={helpCircleSharp} />
      </IonButton>
    );
}

export default HelpModal;