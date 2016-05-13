import React from 'react'
import ReactDom from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const item = this.props.item;

      return (
        <div className="list-container">
          {(() => {
            switch (item.textContent.type) {
              case "list":
                return <ul>
                    {
                      item.textContent.text.map( textLine => {
                        return <li key={textLine.contentId}>{textLine.content}</li>
                      })
                    }
                  </ul>;
              case "text":
                return <p>{item.textContent.text}</p>;
              default:
                return null;
            }
          })()}

        </div>
      )
  }

}
