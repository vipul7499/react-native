import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from './images/Exercise.png';
import Title from './Title';
import { ResponsiveBar } from '@nivo/bar'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop: '5%',
  },
  media: {
    height: '220px',
    width: '100%',
    backgroundSize: 'contain',
  },
});

export default function Exercise() {
  const classes = useStyles();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'bold', color:"#ef5779" }}>
            Regularity of Menstruation and Frequency of Exercise
          </Typography>
        </CardContent>
        <div style={{height:"400px"}}>
          < MyResponsiveBar/>
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
const MyResponsiveBar = () =>{ 
  const data=[
    {
      "country": "AD",
      "hot dog": 108,
      "hot dogColor": "hsl(62, 70%, 50%)",
      "burger": 122,
      "burgerColor": "hsl(166, 70%, 50%)",
      "sandwich": 34,
      "sandwichColor": "hsl(26, 70%, 50%)",
      "kebab": 22,
      "kebabColor": "hsl(120, 70%, 50%)",
      "fries": 195,
      "friesColor": "hsl(248, 70%, 50%)",
      "donut": 193,
      "donutColor": "hsl(36, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 76,
      "hot dogColor": "hsl(294, 70%, 50%)",
      "burger": 106,
      "burgerColor": "hsl(174, 70%, 50%)",
      "sandwich": 163,
      "sandwichColor": "hsl(6, 70%, 50%)",
      "kebab": 103,
      "kebabColor": "hsl(258, 70%, 50%)",
      "fries": 29,
      "friesColor": "hsl(77, 70%, 50%)",
      "donut": 27,
      "donutColor": "hsl(307, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 42,
      "hot dogColor": "hsl(86, 70%, 50%)",
      "burger": 188,
      "burgerColor": "hsl(129, 70%, 50%)",
      "sandwich": 32,
      "sandwichColor": "hsl(354, 70%, 50%)",
      "kebab": 196,
      "kebabColor": "hsl(266, 70%, 50%)",
      "fries": 153,
      "friesColor": "hsl(128, 70%, 50%)",
      "donut": 62,
      "donutColor": "hsl(213, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 194,
      "hot dogColor": "hsl(201, 70%, 50%)",
      "burger": 92,
      "burgerColor": "hsl(269, 70%, 50%)",
      "sandwich": 178,
      "sandwichColor": "hsl(161, 70%, 50%)",
      "kebab": 92,
      "kebabColor": "hsl(302, 70%, 50%)",
      "fries": 143,
      "friesColor": "hsl(338, 70%, 50%)",
      "donut": 142,
      "donutColor": "hsl(169, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 122,
      "hot dogColor": "hsl(301, 70%, 50%)",
      "burger": 193,
      "burgerColor": "hsl(105, 70%, 50%)",
      "sandwich": 125,
      "sandwichColor": "hsl(194, 70%, 50%)",
      "kebab": 49,
      "kebabColor": "hsl(335, 70%, 50%)",
      "fries": 115,
      "friesColor": "hsl(181, 70%, 50%)",
      "donut": 37,
      "donutColor": "hsl(115, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 33,
      "hot dogColor": "hsl(210, 70%, 50%)",
      "burger": 73,
      "burgerColor": "hsl(22, 70%, 50%)",
      "sandwich": 159,
      "sandwichColor": "hsl(64, 70%, 50%)",
      "kebab": 35,
      "kebabColor": "hsl(168, 70%, 50%)",
      "fries": 71,
      "friesColor": "hsl(39, 70%, 50%)",
      "donut": 98,
      "donutColor": "hsl(252, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 18,
      "hot dogColor": "hsl(131, 70%, 50%)",
      "burger": 66,
      "burgerColor": "hsl(80, 70%, 50%)",
      "sandwich": 141,
      "sandwichColor": "hsl(290, 70%, 50%)",
      "kebab": 191,
      "kebabColor": "hsl(42, 70%, 50%)",
      "fries": 85,
      "friesColor": "hsl(16, 70%, 50%)",
      "donut": 50,
      "donutColor": "hsl(146, 70%, 50%)"
    }
  ]
  return(
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'blue_purple' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)}
