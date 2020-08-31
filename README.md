# Synopsis

Une barre de recherche proposant des entités stockées dans IndexedDB.
Un second composant permet de charger l'index à partir d'une liste d'entités.

`npm install idb-suggester` ou `yarn add idb-suggester`

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
