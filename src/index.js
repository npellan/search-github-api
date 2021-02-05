// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

// == Import : local
// Composants
import Github from 'src/components/Github';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de Github)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = <Github />;
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
