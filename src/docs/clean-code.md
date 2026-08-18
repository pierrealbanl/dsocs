---
title: Clean Code by Robert C. Martin
sidebar_label: Clean Code by Robert C. Martin
sidebar_position: 4
---

# Clean Code by Robert C. Martin

Cette section s’adresse à celles et ceux qui souhaitent apprendre à produire un code propre, lisible et maintenable sur le long terme. Elle contient un résumé complet du livre Clean Code, ouvrage de référence consacré aux bonnes pratiques de développement logiciel. Afin de préserver l’authenticité du contenu, les extraits ont été conservés exactement tels qu’ils apparaissent dans l’œuvre originale.

La lecture complète du livre reste fortement recommandée. Au-delà des aspects purement techniques, l’ouvrage développe également de nombreuses métaphores ainsi qu’une réflexion plus globale et philosophique autour de la conception logicielle et des bonnes pratiques de développement. Voici le lien pour lire le livre : [Clean Code by Robert C. Martin](http://repo.aassfxxx.infos.st/docs/Coder%20Proprement.pdf)

:::info
Petite parenthèse concernant les personnes qui apprennent avec l’intelligence artificielle.

Les intelligences artificielles actuelles sont capables de produire des explications techniques très avancées, parfois comparables au contenu d’un ouvrage spécialisé, mais elles restent souvent moins profondes que les meilleurs livres. Cette différence vient principalement de la manière dont l’information est construite. Un livre technique sérieux développe progressivement une idée à travers des exemples, des contre-exemples, des nuances, des répétitions volontaires et une continuité intellectuelle pensée sur plusieurs chapitres. À l’inverse, une IA tend naturellement à condenser l’information pour répondre rapidement et efficacement, ce qui produit souvent une version compressée du savoir plutôt qu’une immersion complète dans le sujet. Elle peut expliquer correctement des concepts comme ceux de Clean Code, mais sans toujours reproduire la densité pédagogique, la progression mentale et la cohérence longue qu’apporte un auteur expérimenté. En réalité, les modèles actuels possèdent souvent la capacité brute de générer des explications beaucoup plus détaillées, mais ils sont généralement utilisés dans des échanges courts qui favorisent le résumé plutôt que l’approfondissement méthodique.

Les livres ne sont pas nécessairement meilleurs que l’intelligence artificielle dans tous les domaines d’apprentissage, mais ils restent aujourd’hui souvent supérieurs pour construire une compréhension profonde et durable d’un sujet. Une IA permet d’apprendre rapidement, d’obtenir des explications adaptées à son niveau, de poser des questions en continu et de pratiquer de manière interactive, ce qui en fait un outil extrêmement efficace pour progresser vite, notamment en programmation. Cependant, les meilleurs livres techniques apportent encore quelque chose que les IA reproduisent difficilement : une progression intellectuelle cohérente, une rigueur pédagogique, une continuité de raisonnement et une exploration détaillée des nuances et compromis réels d’un domaine. Là où l’IA tend à fragmenter et condenser l’information pour répondre immédiatement, un livre construit progressivement un modèle mental solide sur plusieurs chapitres. En pratique, l’approche la plus efficace aujourd’hui consiste souvent à utiliser les livres pour la structure et la profondeur théorique, l’IA pour l’interactivité et l’explication personnalisée, puis les projets réels pour transformer cette compréhension en véritable compétence.
:::

### Page 21. Introduction

Apprendre à écrire du code propre est un travail difficile. Cela ne se limite pas à connaître des principes et des motifs. Vous devez transpirer. Vous devez pratiquer et constater vos échecs. Vous devez regarder d'autres personnes pratiquer et échouer. Vous devez les voir hésiter et revenir sur leurs pas. Vous devez les voir se tourmenter sur des décisions et payer le prix de leurs mauvais choix. Vous devez être prêt à travailler dur au cours de la lecture de cet ouvrage. Il ne s'agit pas d'un livre que vous pourrez lire dans un avion et terminer avant d'atterrir. Il vous imposera de travailler, dur. Qu'est-ce qui vous attend ? Vous allez lire du code, beaucoup de code. Vous devrez réfléchir aux points positifs et aux points négatifs de ce code. Il vous sera demandé de nous suivre pendant que nous découpons des modules, pour ensuite les réunir à nouveau. Cela demandera du temps et des efforts, mais nous pensons que cela en vaut la peine.

## 1. Code propre

### Page 28. Mauvais code

Je connais une entreprise qui, à la fin des années 1980, a développé une application phare. Elle a été très populaire, et un grand nombre de professionnels l'ont achetée et employée. Mais les cycles de livraison ont ensuite commencé à s'étirer. Les bugs n'étaient pas corrigés d'une version à la suivante. Les temps de chargement se sont allongés et les crashs se sont multipliés. Je me rappelle avoir un jour fermé ce produit par frustration et ne plus jamais l'avoir utilisé. Peu après, l'entreprise faisait faillite.

Vingt ans plus tard, j'ai rencontré l'un des premiers employés de cette société et lui ai demandé ce qui s'était passé. Sa réponse a confirmé mes craintes. Ils s'étaient précipités pour placer le produit sur le marché, mais avaient massacré le code. Avec l'ajout de nouvelles fonctionnalités, la qualité du code s'est dégradée de plus en plus, jusqu'à ce qu'ils ne puissent plus le maîtriser. Un mauvais code a été à l'origine de la faillite de l'entreprise.

### Page 31. Coût total d’un désordre

Les directeurs et les responsables marketing nous demandent les informations dont ils ont besoin pour définir leurs promesses et leurs engagements. Et, même s'ils ne nous interrogent pas, nous ne devons pas éviter de leur dire ce que nous pensons. Les utilisateurs se tournent vers nous pour valider la manière dont les exigences se retrouveront dans le système. Les chefs de projet comptent sur nous pour respecter les échéances. Nous sommes totalement complices du planning du projet et partageons une grande part de responsabilité dans les échecs ; en particulier si ces échecs sont liés à du mauvais code !

*Mais, attendez !, dites-vous. Si je ne fais pas ce que mon chef demande, je serai licencié.* Probablement pas. La plupart des directeurs veulent connaître la vérité, même s'ils ne le montrent pas. La plupart des directeurs veulent du bon code, même lorsqu'ils sont obsédés par les échéances. Ils peuvent défendre avec passion le planning et les exigences, mais c'est leur travail. Le vôtre consiste à défendre le code avec une passion équivalente. Les développeurs connaissent la pression qui conduit au désordre pour respecter les échéances. En résumé, ils ne prennent pas le temps d'aller vite !

### Pages 32-37. Qu'est-ce qu'un code propre ?

Il existe probablement autant de définitions que de programmeurs. C'est pourquoi j'ai demandé l'avis de programmeurs très connus et très expérimentés. 

> **Bjarne Stroustrup, inventeur du C++ et auteur du livre Le Langage C++**
>
> *"J'aime que mon code soit élégant et efficace. La logique doit être simple pour que les bogues aient du mal à se cacher. Les dépendances doivent être minimes afin de faciliter la maintenance. La gestion des erreurs doit être totale, conformément à une stratégie articulée. Les performances doivent être proches de l'idéal afin que personne ne soit tenté d'apporter des optimisations éhontées qui dégraderaient le code. Un code propre fait une chose et la fait bien."*

Bjarne utilise le terme élégant. Quel mot ! Le dictionnaire de mon MacBook donne les définitions suivantes : *agréablement gracieux et équilibré dans les proportions ou dans la forme ; agréablement simple et ingénieux.* Vous aurez remarqué l'insistance sur le mot *agréable*. Bjarne semble penser qu'un code propre est agréable à lire. En le lisant, vous devez sourire, autant qu'en contemplant une boîte à musique bien ouvragée ou une voiture bien dessinée.

Bjarne mentionne également, deux fois, l'efficacité. Cela ne devrait pas nous surprendre de la part de l'inventeur du C++, mais je pense que cela va plus loin que le pur souhait de rapidité. Les cycles gaspillés sont inélégants, désagréables. Notez le terme employé par Bjarne pour décrire les conséquences de cette grossièreté. Il choisit le mot *tenter*. Il y a ici une vérité profonde. Le mauvais code a tendance à augmenter le désordre ! Lorsque d'autres personnes interviennent sur le mauvais code, elles ont tendance à le dégrader.

Dave Thomas et Andy Hunt expriment cela de manière différente. Ils utilisent la métaphore des vitres cassées. Lorsque les vitres d'un bâtiment sont cassées, on peut penser que personne ne prend soin du lieu. Les gens ne s'en occupent donc pas. Ils acceptent que d'autres vitres soient cassées, voire les cassent eux-mêmes. Ils salissent la façade avec des graffiti et laissent les ordures s'amonceler. Une seule vitre cassée est à l'origine du processus de délabrement. 

Bjarne mentionne également que le traitement des erreurs doit être complet. Cela est en rapport avec la règle de conduite qui veut que l'on fasse attention aux détails. Pour les programmeurs, un traitement des erreurs abrégé n'est qu'une manière de passer outre les détails. Les fuites de mémoire en sont une autre, tout comme la concurrence critique et l'usage incohérent des noms. En conséquence, le code propre met en évidence une attention minutieuse envers les détails.

Bjarne conclut en déclarant que le code propre ne fait qu'une seule chose et la fait bien. Ce n'est pas sans raison si de nombreux principes de conception de logiciels peuvent se ramener à ce simple avertissement. Les auteurs se tuent à communiquer cette réflexion. Le mauvais code tente d'en faire trop, ses objectifs sont confus et ambigus. Un code propre est ciblé. Chaque fonction, chaque classe, chaque module affiche un seul comportement déterminé, insensible aux détails environnants.

> ***Big* Dave Thomas, fondateur d'OTI, parrain de la stratégie d'Eclipse**
>
> *"Un code propre peut être lu et amélioré par un développeur autre que l'auteur d'origine. Il dispose de tests unitaires et de tests de recette. Il utilise des noms significatifs. Il propose une manière, non plusieurs, de réaliser une chose. Ses dépendances sont minimales et explicitement définies. Il fournit une API claire et minimale. Un code doit être littéraire puisque, selon le langage, les informations nécessaires ne peuvent pas toutes être exprimées clairement par le seul code."*

Big Dave partage le souhait de lisibilité de Grady, mais avec une autre formulation. Dave déclare que le code propre doit pouvoir être facilement amélioré par d'autres personnes. Cela peut sembler évident, mais il n'est pas inutile de le rappeler. En effet, il existe une différence entre un code facile à lire et un code facile à modifier.

Dave associe la propreté aux tests ! Il y a une dizaine d'années, cela aurait fait tiquer de nombreuses personnes. Mais le développement piloté par les tests a eu un impact profond sur notre industrie et est devenu l'une de nos disciplines fondamentales. Dave a raison. Un code sans tests ne peut pas être propre. Quelles que soient son élégance, sa lisibilité et son accessibilité, s'il ne possède pas de tests, il n'est pas propre.

Dave emploie deux fois le mot minimal. Il semble préférer le code court au code long. C'est un refrain que l'on a beaucoup entendu dans la littérature informatique. Plus c'est petit, mieux c'est.

Dave prétend également que le code doit être littéraire. Il s'agit d'une référence discrète à la programmation littéraire de Knuth [Knuth92]. Le code doit être écrit de sorte qu'il puisse être lu par les humains.

> **Ron Jeffries, auteur de Extreme Programming Installed et de Extreme Programming Adventures in C#**
>
> *"Ces dernières années, j'ai commencé, et pratiquement réussi, à suivre les règles de code simple de Beck. Par ordre de priorité, un code simple :*
> - *passe tous les tests ;*
> - *n'est pas redondant ;*
> - *exprime toutes les idées de conception présentes dans le système ;*
> - *minimise le nombre d'entités, comme les classes, les méthodes, les fonctions et assimilées.*
>
> *Parmi tous ces points, je m'intéresse principalement à la redondance. Lorsque la même chose se répète de nombreuses fois, cela signifie que l'une de nos idées n'est pas parfaitement représentée dans le code. Je tente tout d'abord de la déterminer, puis j'essaie de l'exprimer plus clairement.*
>
> *Pour moi, l'expressivité se fonde sur des noms significatifs et je renomme fréquemment les choses plusieurs fois avant d'être satisfait. Avec des outils de développement modernes, comme Eclipse, il est facile de changer les noms. Cela ne me pose donc aucun problème. Cependant, l'expressivité ne se borne pas aux noms. Je regarde également si un objet ou une méthode n'a pas plusieurs rôles. Si c'est le cas d'un objet, il devra probablement être décomposé en deux objets, ou plus. Dans le cas d'une méthode, je lui applique toujours la procédure Extract Method afin d'obtenir une méthode qui exprime plus clairement ce qu'elle fait et quelques méthodes secondaires qui indiquent comment elle procède.*
>
> *La redondance et l'expressivité m'amènent très loin dans ce que je considère être un code propre. L'amélioration d'un code sale en ayant simplement ces deux aspects à l'esprit peut faire une grande différence. Cependant, je sais que je dois agir sur un autre point, mais il est plus difficile à expliquer.*
>
> *Après des années de développement, il me semble que tous les programmes sont constitués d'éléments très similaires. C'est par exemple le cas de l'opération « rechercher des choses dans une collection ». Dès lors que nous avons une base de données d'employés, une table de hachage de clés et de valeurs ou un tableau d'éléments de n'importe quelle sorte, nous voulons constamment rechercher un élément précis dans cette collection. Lorsque cela arrive, j'enveloppe la mise en œuvre particulière dans une méthode ou une classe plus abstraite. J'en retire ainsi plusieurs avantages.*
>
> *Je peux alors implémenter la fonctionnalité avec quelque chose de simple, par exemple une table de hachage, mais, puisque toutes les références à cette recherche sont désormais couvertes par la petite abstraction, je peux modifier l'implémentation à tout moment. Je peux avancer plus rapidement, tout en conservant une possibilité de modifications ultérieures.*
>
> *Par ailleurs, l'abstraction de collection attire souvent mon attention sur ce qui se passe « réellement » et m'empêche d'implémenter un comportement de collection arbitraire alors que je souhaite simplement disposer d'une solution me permettant de trouver ce que je recherche.*
>
> *Redondance réduite, haute expressivité et construction à l'avance d'abstractions simples. Voilà ce qui, pour moi, permet d'obtenir un code propre."*

### Page 41. Nous sommes des auteurs

Le rapport entre le temps passé à lire et le temps passé à écrire est bien supérieur à 10:1. Nous lisons constamment l'ancien code pour écrire le nouveau. Puisque ce rapport est très élevé, la lecture du code doit être facile, même si son écriture est plus difficile. Bien entendu, il est impossible d'écrire du code sans le lire. Par conséquent, *en rendant un code facile à lire, on le rend plus facile à écrire.*

## 2. Noms significatifs

### Page 45. Choisir des noms révélateurs des intentions

Le nom d’une variable, d’une fonction ou d’une classe doit répondre à certaines grandes questions : la raison de son existence, son rôle et son utilisation. Si un nom exige un commentaire, c’est qu’il ne répond pas à ces questions.

```java
int d; // Temps écoulé en jours.
```

Le nom `d` ne révèle rien. Il n’évoque pas une durée écoulée, pas même des jours (days). Nous devons choisir un nom qui précise ce qui est mesuré et l’unité de mesure :

```java
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
```

### Page 51. Choisir des noms compatibles avec une recherche

Pour moi, les noms d’une seule lettre ne doivent être utilisés que pour les variables locales à l’intérieur de méthodes courtes. La longueur d’un nom doit correspondre à la taille de sa portée. Si une variable ou une constante peut être visible ou utilisée en
plusieurs endroits du code, il est impératif de lui donner un nom compatible avec les recherches. À nouveau, comparons

```java
for (int j = 0; j < 34; j++) {
    s += (t[j]*4)/5;
}
```

à

```java
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
    
for (int j = 0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
```

Vous conviendrez que `sum`, à défaut d’être un nom particulièrement utile, est au moins facile à rechercher. Le code qui utilise des noms intentionnels conduit à une fonction longue. Cependant, il faut prendre en compte la facilité de recherche du mot `WORK DAYS PER WEEK` par rapport à la recherche de tous les endroits où 5 a été utilisé et au filtrage des résultats afin de déterminer les occurrences qui présentent le sens voulu.

### Page 52. Éviter la codification

Aujourd’hui, il est également inutile de préfixer les variables membres par `m`. Les classes et les fonctions doivent être suffisamment courtes pour rendre cette méthode obsolète. Il faut employer un environnement de développement qui surligne ou colore les membres afin qu’ils apparaissent clairement.

```java
public class Part {
    private String m_dsc; // La description textuelle.
    void setName(String name) {
        m_dsc = name;
    }
}
```

-------------------------------------------------
```java
public class Part {
    String description;
    void setDescription(String description) {
        this.description = description;
    }
}
```

Les programmeurs ont par ailleurs rapidement appris à ignorer le préfixe (ou le suffixe) pour ne voir que la partie significative du nom. Plus nous lisons du code, moins nous remarquons les préfixes. Ces derniers finissent par devenir un fouillis inutile et signalent un code ancien.

### Page 53. Éviter les associations mentales

En général, les programmeurs sont des personnes plutôt intelligentes. Parfois, les personnes intelligentes aiment exhiber leur intelligence en montrant leur capacité de jonglage mental. En effet, si vous pouvez mémoriser sans faillir le fait que `r` est la version en minuscule de l’URL dans laquelle l’hôte et le schéma ont été supprimés, alors, vous devez certainement être très intelligent.

Il existe toutefois une différence entre un programmeur intelligent et un programmeur professionnel : le programmeur professionnel comprend que la clarté prime. Les professionnels emploient leurs facultés à bon escient et écrivent du code que les autres sont en mesure de comprendre.

### Pages 53. Noms des classes

Pour les classes et les objets, nous devons choisir des noms ou des groupes nominaux comme `Customer`, `WikiPage`, `Account` ou `AddressParser`. Il est préférable d’éviter les termes `Manager`, `Processor`, `Data` ou `Info` dans le nom d’une classe. Un nom de classe ne doit pas être un verbe.

### Pages 54. Noms des méthodes

Pour les méthodes, nous devons choisir des verbes ou des groupes verbaux comme `postPayment`, `deletePage` ou `save`. Les accesseurs, les mutateurs et les prédicats doivent être nommés d’après leur valeur et préfixés par get, set ou is conformément au standard JavaBean.

```java
string name = employee.getName();
customer.setName("mike");
if (paycheck.isPosted())...
```

### Page 56. Choisir des noms dans le domaine de la solution

N’oubliez pas que les personnes qui liront votre code seront des programmeurs. Par conséquent, n’hésitez pas et employez des termes informatiques, des noms d’algorithmes, des noms de motifs, des termes mathématiques, etc. Il n’est pas judicieux de prendre uniquement des noms issus du domaine du problème car vos collègues devront se tourner vers le client pour lui demander le sens de chaque mot alors qu’ils connaissent déjà le concept sous un autre nom. Le nom `AccountVisitor` signifie quelque chose à tout programmeur familier du motif VISITEUR. Quel programmeur ne sait pas ce qu’est un `JobQueue` ? Les programmeurs ont énormément de choses très techniques à réaliser. Donner des noms techniques à ces choses se révèle généralement la meilleure option.

### Page 56. Choisir des noms dans le domaine du problème

Lorsqu’il n’existe aucun terme informatique pour ce que vous faites, utilisez le nom issu du domaine du problème. Le programmeur qui maintient votre code pourra au moins demander à un expert du domaine ce qu’il signifie. La séparation des concepts du domaine de la solution et du problème fait partie du travail du bon programmeur et du bon concepteur. Le code qui est fortement lié aux concepts du domaine du problème doit employer des noms tirés de ce domaine.

### Page 56-57. Ajouter un contexte significatif

Quelques noms sont en eux-mêmes significatifs, mais ce n’est pas le cas de la plupart. Vous devez redonner aux noms leur contexte en les englobant dans les classes ou des fonctions aux noms appropriés, ou dans des espaces de noms. En dernier ressort, il peut être nécessaire d’ajouter un préfixe aux noms.

Imaginez qu’il existe les variables `firstName`, `lastName`, `street`, `houseNumber`, `city`, `state` et `zipcode`. En les considérant ensemble, il est facile de comprendre qu’elles forment une adresse. En revanche, si vous rencontrez uniquement la variable state (état) dans une méthode, en déduisez-vous automatiquement qu’elle fait partie d’une adresse ? Vous pouvez ajouter un contexte en employant des préfixes : `addrFirstName`, `addrLastName`, `addrState`, etc. Les lecteurs comprendront facilement que ces variables font partie d’une structure plus vaste. Bien entendu, une meilleure solution consiste à créer une classe nommée Address. Ainsi, même le compilateur sait que la variable appartient à un concept plus vaste.
