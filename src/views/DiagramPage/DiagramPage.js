import React, { Component } from 'react';
import Diagram, { CustomShape, ConnectionPoint, Group, Toolbox } from 'devextreme-react/diagram';
import RandomForestIcon from './imgs/random-forest.png';
import Block1Icon from './imgs/play-button.png';
import Block2Icon from './imgs/random-forest.png';
import Block3Icon from './imgs/random-forest.png';
import Block4Icon from './imgs/random-forest.png';
import Block5Icon from './imgs/random-forest.png';
import Block6Icon from './imgs/random-forest.png';
import Block7Icon from './imgs/random-forest.png';
import Block8Icon from './imgs/random-forest.png';
import data from './data/data.json'
import Block from './Block'

export default class DiagramPage extends Component {

    constructor(props) {
        super(props);
        this.diagramRef = React.createRef();

        this.blockData = [
            {
                id: 1,
                icon: RandomForestIcon,
                type: "randomForest",
                text: "Random Forest"
            },
            {
                id: 2,
                icon: Block1Icon,
                type: "Block1Icon",
                text: "Block1Icon"
            },
            {
                id: 3,
                icon: Block2Icon,
                type: "Block2Icon",
                text: "Block2Icon"
            }
            ,
            {
                id: 4,
                icon: Block3Icon,
                type: "Block3Icon",
                text: "Block3Icon"
            }
            ,
            {
                id: 5,
                icon: Block4Icon,
                type: "Block4Icon",
                text: "Block4Icon"
            }
            ,
            {
                id: 6,
                icon: Block5Icon,
                type: "Block5Icon",
                text: "Block5Icon"
            }
            ,
            {
                id: 7,
                icon: Block6Icon,
                type: "Block6Icon",
                text: "Block6Icon"
            }
            ,
            {
                id: 8,
                icon: Block7Icon,
                type: "Block7Icon",
                text: "Block7Icon"
            }
            ,
            {
                id: 9,
                icon: Block8Icon,
                type: "Block8Icon",
                text: "Block8Icon"
            }
        ]
    }

    componentDidMount() {
        //Load data from JSON file to diagram
        let diagram = this.diagramRef.current.instance;
        diagram.import(JSON.stringify(data));
    }

    addBlock = (id) => {
        this.blockData.map((value, key) => {
            //Get data from diagram reference
            if (value.id == id) {
                let diagram = this.diagramRef.current.instance;
                const diagramCurrentData =  diagram.export();
                //Convert to Json object
                let dataObj = JSON.parse(diagramCurrentData);
                //Create id of block
                let blockId = "0d";
                if(dataObj.shapes.length > 0) {
                    blockId = parseInt(dataObj.shapes[dataObj.shapes.length - 1].key) + 1 + "d";
                }
                //Create block object
                const blockObj = this.createBlockObj(value.type, value.text, blockId);

                //Add block to diagram
                dataObj.shapes.push(blockObj);
                diagram.import(JSON.stringify(dataObj));
            }  
        })
    }

    createBlockObj = (type, text, blockId) => ({
            "height": 1440,
            "key": blockId,
            "locked": false,
            "text": text,
            "type": type,
            "width": 1440,
            "x": 0,
            "y": 0,
            "zIndex": 0
        }
    )

    render() {
    return (
      <div className="diagram-page">
          <Diagram id="diagram" ref={this.diagramRef} height={800}>
            {
                this.blockData.map((value, key) => (
                <CustomShape
                    key={key}
                    category=""
                    type={value.type}
                    title={value.text}
                    backgroundImageUrl={value.icon}
                    backgroundImageLeft={0.15}
                    backgroundImageTop={0}
                    backgroundImageWidth={0.7}
                    backgroundImageHeight={0.7}
                    defaultWidth={0.75}
                    defaultHeight={0.75}
                    defaultText={value.text}
                    allowEditText={true}
                    textLeft={0}
                    textTop={0.7}
                    textWidth={1}
                    textHeight={0.3}>
                    <ConnectionPoint x={0.5} y={0} />
                    <ConnectionPoint x={0.9} y={0.5} />
                    <ConnectionPoint x={0.5} y={1} />
                    <ConnectionPoint x={0.1} y={0.5} />
                </CustomShape>     
                ))
            }
          </Diagram>
          <div className="dock">
            {
                this.blockData.map((value, key) => (
                   <Block onDoubleClick={() => { this.addBlock(value.id); }} key={key} imageSource={value.icon}/>
                ))
            }
          </div>   
      </div>
    );
  }
}
