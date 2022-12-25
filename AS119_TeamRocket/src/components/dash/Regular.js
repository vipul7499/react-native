import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { ResponsivePie } from '@nivo/pie'


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop: '5%',
  },
  media: {
    height: '250px',
    width: '100%',
    backgroundSize: 'contain',
  },
});

export default function Regular() {
  const classes = useStyles();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'bold', color:"#ef5779" }}>
            Regularity of Menstrual Cycle 
          </Typography>
        </CardContent>
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        /> */}
        <div style={{height:"400px"}}>
      <MyResponsivePie/>
      </div>
      </CardActionArea>
    </Card>
  );
}




// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsivePie = () => {
  const data=[
    {
      "id": "regular",
      "label": "",
      "value": 171,
      "color": "hsl(65, 70%, 50%)"
    },
    {
      "id": "irregular",
      "label": "",
      "value": 115,
      "color": "hsl(19, 70%, 50%)"
    },
    {
      "id": "highly irregular",
      "label": "",
      "value": 17,
      "color": "hsl(340, 70%, 50%)"
    },
    {
      "id": "need to consult OBGYN",
      "label": "",
      "value": 325,
      "color": "hsl(278, 70%, 50%)"
    },
    {
      "id": "fairly regular",
      "label": "",
      "value": 500,
      "color": "hsl(134, 70%, 50%)"
    }
  ]
  return (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-180}
        innerRadius={0.55}
        padAngle={2}
        cornerRadius={5}
        colors={{ scheme: 'purple_red' }}
        borderWidth={1}
        borderColor={{ theme: 'background' }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#bd7fb9"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            // {
            //     anchor: 'bottom',
            //     direction: 'row',
            //     translateY: 56,
            //     itemWidth: 100,
            //     itemHeight: 18,
            //     itemTextColor: '#999',
            //     symbolSize: 18,
            //     symbolShape: 'circle',
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemTextColor: '#000'
            //             }
            //         }
            //     ]
            // }
        ]}
    />

)}