# Tutoriel blockchain : de zéro vers ...

Le but de ce tutoriel est de coder une blockchain depuis zéro pour en comprendre les mécanismes. Cette blockchain sera très loin d'une blockchain de production mais permettra d'illustrer les différentes mécaniques la constituant. Les notions et les problématiques seront introduites au fur et à mesure de la progression. Certaines seront *un peu* simplifiées.

Le code se fait en Javascript pour permettre au plus grand nombre de réaliser ce tutoriel et parce que c'est le langage de programmation que j'utilise quotidiennement :D. L'environnement utilisé pour l'écriture de ce sujet est Node.js (https://nodejs.org/fr/) en version 11 avec npm pour gérer les dépendances mais il doit fonctionner à partir de la version 8. Je pars du principe que vous savez coder dans ce langage et utiliser git.

Pour écrire ce tutoriel, je me suis inspiré de la suite d'article de Kass sur Medium qui réalise une blockchain en Java : https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa.

## Cloner ce dépôt

```Bash
git clone https://github.com/dreimert/BuildYourBlock.git
cd BuildYourBlock
```

## Au commencement fut le block

Dans une blockchain, il y a block. Un block est un ensemble d'informations et quand les blocks sont mis bout-à-bout, ils forment une chaîne : la blockchain !

Commençons avec une structure de block assez simple :

* Un identifiant : permet d'identifier le block. Il sera généré aléatoirement.
* Un identifiant de parent : l'identifiant du block qui précède dans la chaîne. Cela nous permet de remonter la chaîne jusqu'à son origine.
* Des données : pour le moment, une simple chaîne de caractères.

J'ai écrit le fichier `index.js` suivant :

```Javascript
const Block = require("./Block");

const first  = new Block(null     , "First !");
const second = new Block(first.id , "Second :)");
const third  = new Block(second.id, "Vous commencez à voir le principe ?");

console.log([first, second, third]);
```

J'ai aussi commencé à écrire le fichier `Block.js` que vous devez compléter.

Quand c'est fini, dans un terminal placé dans ce dossier : `node ./index.js`. Vous devriez voir quelque chose comme cela :

```
[ Block<
       id: <xxxxxx>
       prev: null
       val: 'First !' >,
  Block<
       id: <yyyyyy>
       prev: <xxxxxx>
       val: 'Second :)' >,
  Block<
       id: <zzzzzz>
       prev: <yyyyyy>
       val: 'Vous commencez à voir le principe ?' > ]
```

C'est bon ? Magnifique ! Vous avez une première blockchain ! Bon, par contre, elle n'est  pas fonctionnelle... Quand un block est ajouté dans la Blockchain, il n'est plus modifiable. Ici, rien ne vous empêche de modifier ce que vous voulez.

Par exemple, complétez le code d'index.js en modifiant les données du troisième block.

## Prenons un peu de hash

Nous voulons vérifier que les blocks n'ont pas été modifiés. Pour vérifier l'intégrité des données, on utilise les fonctions de hachage.

Une fonction de hachage est une fonction qui prend en entrée un ensemble de données et retourne une empreinte, aussi appelée hash. L'empreinte respecte deux principes : Elle est unique pour un ensemble de données d'entrée, et une empreinte donnée ne permet pas de remonter à l'ensemble initial. On parle de non-collision et de non calculabilité de la pré-image. Cette empreinte est de taille fixe quelque-soit l'entrée. Une fonction couramment utilisé est SHA. Voici quelques exemples d'empreinte :

```Bash
> echo "Blockchain" | shasum
# efcf8baf5959ad1ebc7f4950425ef1c2eae9cbd9  -

> echo "Block" | shasum
# d1a6b1157e37bdaad78bec4c3240f0d6c576ad21  -

> echo "Vous commencez à voir le principe ?" | shasum
# 25abec7ced7642b886c1bffbc710cc3439f23ab7  -
```

Une propriété intéressante est qu'une petite modification dans l'entrée change totalement l'empreinte :

```Bash
> echo "Blockchain" | shasum
# efcf8baf5959ad1ebc7f4950425ef1c2eae9cbd9  -

> echo "blockchain" | shasum
# ea5f179324c233b002fa8ac4201fa216001515e5  -
```

Si je vous parle de tout ça, c'est qu'on va l'utiliser mais comment cela résout notre problème ?

Une idée ?

Cool !

On va calculer l'empreinte du block avec cette fonction et on va utiliser cette empreinte comme identifiant du block. Si on modifie le block, son empreinte change donc son `id` change ! Mais cette `id` est utilisé dans le block suivant, ce qui modifie son empreinte. Et ainsi de suite jusqu'au dernier block de la chaîne. On va tester plus loin.

La fonction suivante prend en entrée une chaîne de caractère et retourne l'empreinte correspondante.

```Javascript
const crypto = require('crypto');

function getHash(unMotDoux) {
  return crypto.createHash('sha256').update(unMotDoux, 'utf8').digest('hex');
}
```

Modifier la class Block pour lui ajouter la fonction getHash qui calcule l'empreinte correspondant au block. Pour calculer cette empreinte, vous devez utiliser l'identifiant du block précédent et les données contenues dans le block.

Exemple de concaténation :

```Javascript
const toHash = `${previous}${data}`;
```

Vous obtenez exactement ça :

```
[ Block<
       id: '9b1d3da5be217ffa1622466bf7c2e5fea827c4ee7c32af170da00f89ed49356d'
       prev: null
       val: 'First !' >,
  Block<
       id: 'ffb3dad005c79eb32345f2506189368ef5556dbacd05c8b94d59907ce64bd722'
       prev: '9b1d3da5be217ffa1622466bf7c2e5fea827c4ee7c32af170da00f89ed49356d'
       val: 'Second :)' >,
  Block<
       id: '66d623f52b392c4ddec3129a25a9e5b992d71b062aff0d838fec16cda7527dcf'
       prev: 'ffb3dad005c79eb32345f2506189368ef5556dbacd05c8b94d59907ce64bd722'
       val: 'Vous commencez à voir le principe ?' > ]
```

Maintenant, essayez de modifier le premier élément de la chaîne.

###### Comparez avec l'exécution précédente. Qu'est-ce qu'il se passe ?

## Suite

Vous avez survécu ? Cool ! Passons à l'étape suivante : `git checkout etape-2`.
