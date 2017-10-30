import React, { Component } from 'react';

class Lightbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var prev = '<';
        var next = '>';
        return (
            <div className={this.props.show ? 'lightbox show' : 'lightbox'}>
                {this.props.currentIndex != 0 && 
                    <div className='prevButton' onClick={this.props.prevImage}><p>{prev}</p></div>}
                <img src={this.props.path} alt=''></img>
                <div className='closeButton' onClick={this.props.hideImage}><p>X</p></div>
                {this.props.currentIndex != this.props.imageCount - 1 && 
                    <div className='nextButton' onClick={this.props.nextImage}><p>{next}</p></div>}
            </div>
        );
    }
}

export default Lightbox;