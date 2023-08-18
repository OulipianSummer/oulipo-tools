import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React, { useState } from 'react'; // Import useState

import { useLocation } from 'react-router-dom';
import { documentTextOutline, documentTextSharp, helpOutline, helpSharp, homeOutline, homeSharp, libraryOutline, librarySharp, textOutline, textSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url?: string;
  iosIcon?: string;
  mdIcon?: string;
  title: string;
  subItems?: AppPage[]; // Add subItems property for nested menu items
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: helpOutline,
    mdIcon: helpSharp
  },
  {
    title: 'Letter Tools',
    iosIcon: textOutline,
    mdIcon: textSharp,
  },
  {
    title: 'Word Tools',
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp,
    subItems: [
      {
        title: 'Snowballer',
        url: '/word-tools/snowballer',
      },
      {
        title: 'Lipogram Thesaurus',
        url: '/letter-tools/lipogram-thesaurus',
      },
      {
        title: 'Lipogram Rhyming Dictionary',
        url: '/letter-tools/lipogram-rhyming-dictionary',
      }
    ],
  },
  {
    title: 'Thematic Tools',
    iosIcon: libraryOutline,
    mdIcon: librarySharp,
    subItems: [
      {
        title: 'Prompt Engine',
        url: '/thematic-tools/prompt-engine',
      },
    ],
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  // State to manage the visibility of sub-menu items
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Handler for headings.
  const handleHeadingClick = (event: React.MouseEvent, title: string) => {
    event.preventDefault(); // Prevent event propagation
    toggleItem(title);
  };

  // Function to toggle the visibility of sub-menu items
  const toggleItem = (title: string) => {
    if (expandedItems.includes(title)) {
      setExpandedItems(expandedItems.filter(item => item !== title));
    } else {
      setExpandedItems([...expandedItems, title]);
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader>Oulipo Tools</IonListHeader>
          <IonNote>A resource for constrained writing</IonNote>

          {appPages.map((appPage, index) => {
            if (appPage.subItems) {
              const isExpanded = expandedItems.includes(appPage.title);
              
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className="has-submenu" lines="none" detail={true} onClick={(e) => handleHeadingClick(e, appPage.title)}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                  {isExpanded && appPage.subItems.map((subItem, subIndex) => (
                    <IonItem key={subIndex} className={location.pathname === subItem.url ? 'selected submenu-item' : 'submenu-item'} routerLink={subItem.url} routerDirection="none" lines="none" detail={false}>
                      <IonLabel>{subItem.title}</IonLabel>
                    </IonItem>
                  ))}
                </IonMenuToggle>
              );
            } else {
              // Render plain links
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
          })}

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;