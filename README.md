# Synopsis

Une barre de recherche proposant des entités stockées dans IndexedDB.
Un second composant permet de charger l'index à partir d'une liste d'entités.

`npm install idb-suggester` ou `yarn add idb-suggester`
`npm run storybook` ou `yarn storybook`

## DEMO

[DEMO](https://renaud23.github.io/test-idb-suggester/)

## Créer un index dans IDB.

L'index contient une liste d'entités et un index permettant des recherches par préfix sur celle-ci.
A la création, la liste des attributs dont la valeur doit être utilisée pour créer l'index doit-être fournit :

```javascript:
const fields = [{ name: '<field_name>', tokenize: true, language: 'French' }];
```

Si l'attribut tokenize est renseigner à true, la valeur du champs est tokenizer, sa racine est extraite avec l'algorithme snowball et le langage préciser, pour permettre une recherche par mot clef plutôt que par préfixe.

```javascript:
import { createWorker, BULK_INSERT_MESSAGES } from 'idb-suggester';

function workerCallback(args) {
  const { message, step } = args;
  switch (message) {
    case BULK_INSERT_MESSAGES.complete: {
         console.log('Step finished ', step);
      break;
    }
    case BULK_INSERT_MESSAGES.finished:
      console.log('Chargement fini');
      break;
    case BULK_INSERT_MESSAGES.error:
        break;
    default:
  }
}



const idbName = '<MY_STORE_NAME>'; // Nom de la base IDB.
const fields = [{ name: '<field_name>' }, ...]; // description des attributs à indéxer.
const data = [...]; // un tableau contenant la liste d'entité

const bulkTask = createWorker(workerCallback); // créer un web worker pour le chargement.
bulkTask(idbName, fields, data, false/true);// lance la procédure de chargement.
```

Un composant `<StoreManager />` prêt à l'emploi est fournit pour intégrer la tâche d'alimentation de l'index.

## Utiliser un Index

```javascript:
import { Suggester } from '../suggester';
import React, { useState, useEffect } from 'react';
import { createStore, SEARCH_TYPES } from '../store-index';
import 'idb-suggester/themes/css/default-theme.css';

// intégration dans un composant react.

const IDB_INDEX_NAME = 'name';
const IDB_VERSION = 1;
const IDB_ENTITIES_FIELDS = [...];

function App() {
  const [store, setStore] = useState(undefined);
  useEffect(function () {
    async function init() {
      setStore(await createStore(IDB_INDEX_NAME, IDB_VERSION, IDB_ENTITIES_FIELDS));
    }
  });

  return (
    <div style={{ width: '380px' }}>
      <Suggester
        store={store}
        className="custom-css-className"
        displayPath="path"
        placeHolder="Searching something..."
        optionComponent={CustomOptionComponent}
        onSelect={function (item, all, query) {
          console.log('onSelect select option', item, all, query);
        }}
        searchType={SEARCH_TYPES.prefix}
      />
    </div>
  );
}
```

## Suggester Props

| Property          | Type            | Default                                | Description                                                                        |
| :---------------- | :-------------- | :------------------------------------- | :--------------------------------------------------------------------------------- |
| `optionComponent` | store object    | required                               | un index valide chargé avec la fonction createStore                                |
| `optionComponent` | React component | React component                        | composant de rendu des suggestions dans le panel                                   |
| `searchIcon`      | React component | undefined                              | icône de recherche                                                                 |
| `how`             | number          | 15                                     | nombre maximum de suggestions proposées                                            |
| `placeHolder`     | string          | React component                        | placeHolder du champ input                                                         |
| `language`        | string          | React component                        | langage utilisé pour la lemmatisation pour les index de type SEARCH_TYPES.tokenize |
| `className`       | string          | React component                        | classe css additionnelle pour surcharger les styles                                |
| `onChange`        | function        | `(query,suggestions)=>null`            | function invoquée en cas de modification de la recherche                           |
| `onSelect`        | function        | `(selection, suggestions,query)=>null` | function invoquée en cas de sélection d'un item du panel                           |
