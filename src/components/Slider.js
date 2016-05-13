import React from 'react'
import Axios from 'axios'
import OwlCarousel from 'react-owl-carousel';

import Content from './Content.js'

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.pullData = this.pullData.bind(this);
  }

  componentDidMount() {
    this.pullData();
  }

  pullData(){

    Axios('/data.json').then((response) => {
     this.setState({data: response.data });
     //console.log(response);
    });
  }

  render() {
    const items = this.state.data;
    // item: { imageUrl: string, textContent: string }

    return (
      <div className="carousel-block">
        <OwlCarousel slideSpeed={300} pagination singleItem responsive autoPlay>
          {
            items.map( item =>
              {
                return (
                  <div key={item.slideId}>
                    <img src={item.url} />
                    <div>
                      <h4>{item.textContent.textHeader}</h4>

                      <Content item={item} />
                    </div>
                  </div>
                )

              }
            )
          }
        </OwlCarousel>
      </div>

    )
  }
}
