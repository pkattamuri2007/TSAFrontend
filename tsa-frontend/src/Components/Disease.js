import React from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import './Disease.css'
function Disease({diseaseInfo, id, isLoading, symptomChance, description}) {
  return (
    <Card key={id} sx={{ minWidth: 400, maxWidth: 400, mt: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Predicted Disease:
                </Typography>
                <Typography variant="h5" component="div">
                  {diseaseInfo[0]}
                </Typography>
                <Typography sx={{ my: 1.5 }} color="text.secondary">
                  # of Matching Symptoms: {diseaseInfo[1]}
                </Typography>
                <Typography variant="body2">{!isLoading ? description[id]: <CircularProgress/>}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{symptomChance[id]}%</Button>
              </CardActions>
            </Card>
  )
}

export default Disease