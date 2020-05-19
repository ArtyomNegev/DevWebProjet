import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function GridPresentation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <h1>Presentation</h1>
        </Grid>
        <Grid item xs={6}>
          <div id="LeftSideText">
            <p>
              <br></br>
              Aujourd'hui, mes différentes expériences professionnelles m'ont
              permis d'acquérir toutes les compétences nécessaires pour
              intervenir auprès de bébés, d'enfants, d'adolescents que d'adultes
              dont les difficultés et les souffrances psychiques ont un impact
              sur le plan développemental, familial, affectif, somatique,
              social, scolaire ou professionnel. Dans mon cabinet, je vous
              propose une prise en charge adaptée à votre demande qui peut se
              décliner sous forme d'entretiens psychologiques de soutien, d'un
              accompagnement périnatal, d'une guidance parentale, de
              consultations de couple ou familiales ou d'un entretien psycho
              thérapeutique à plus long terme.
              <br></br>
              Mes spécialisations me permettent de réaliser des consultations
              plus spécifiques en addictologie et en périnatalité. Mon objectif
              est de vous accompagner vers le mieux être dans un cadre
              chaleureux, accueillant et sécurisant. Attachée aux valeurs
              déontologiques et éthiques, j'accorde une importance toute
              particulière au respect du secret professionnel, à l'écoute et à
              la compréhension de l'autre dans sa singularité.
            </p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            alt="mental health"
            src={logo}
            width="400"
            height="400"
            id="RightSideImg"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            alt="mental health"
            src={logo}
            width="400"
            height="400"
            id="LeftSideImg"
          />
        </Grid>
        <Grid item xs={6}>
          <div id="RightSideText">
            <p>
              <br></br>
              Au sein de mon cabinet, je vous propose une écoute attentive, un
              moment d'apaisement, de retour sur soi et de recherche de
              solutions. Dans votre vie vous pouvez ressentir le besoin d'avoir
              un moment pour vous, un temps pour échanger avec une personne
              neutre sur vos ressentis, vos angoisses, vos craintes, vos
              inquiétudes. Ces inquiétudes peuvent être très diverses :<br></br>
              <br></br> • Vous traversez une période de bouleversement familial
              ou personnel :maladie, décès, séparation, déménagement, perte
              d'emploi, agression..
              <br></br>
              <br></br>• Vous êtes aux prises avec un sentiment de mal être :
              anxiété, angoisse, tristesse, épuisement, troubles du sommeil,
              somatisation...<br></br>
              <br></br> • Vous connaissez des difficultés dans votre rapport à
              une conduite ou un produit : troubles du comportement alimentaire,
              phobies, addictions et dépendances... (Voir onglet addictions)
              <br></br>
              <br></br> • Vous allez être parent : craintes, angoisses,
              questionnements... (Voir onglet périnatalité)
              <br></br>
              <br></br> • Vous connaissez des difficultés relationnelles avec
              votre enfant : soutien à la parentalité Toutes ces raisons et
              beaucoup d'autres sont valables et légitimes.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
