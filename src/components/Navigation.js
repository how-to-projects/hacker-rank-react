import React, {Component} from "react";
import './Navigation.css';

export default class Navigation extends Component {

    state = {
        locations: this.props.locations
    }

    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }

    navUp(index) {
  
        /**
         * Assume we don't want to circle back around to the last
         * array position, if the current position is zero
         */
        if (index === 0) 
        {
            console.log('On first position');
            return;
        }

        /**
         * This is updating the item's position within the array, but
         * stuck on how to get React to update its UI. I would think
         * updating the data would force React to render the UI again...
         */

        const el1 = this.state.locations.splice(index, 1)[0];
        const to = index - 1;

        this.state.locations.splice(to, 0, el1);

        /**
         * Forces the UI to rerender
         */
        this.setState({state: this.state});
    }

    navDown(index) {
        
        /**
         * Assume we don't want to circle back around to the first
         * array position, if the current position is the last in the array
         */
         if (index === this.state.locations.length - 1) 
         {
             console.log('On last position');
             return;
         }

        const el1 = this.state.locations.splice(index, 1)[0];
        const to = index + 1;

        this.state.locations.splice(to, 0, el1);

        /**
         * Forces the UI to rerender
         */
         this.setState({state: this.state});
    }

    // Used for rendering
    isLast(index) {
        return index === this.props.locations.length - 1;
    }

    render() {
        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                                {
                                    this.state.locations.map((location, index) => {
                                        return (
                                            <li key={'row' + index} data-testid={'location-' + index}
                                        className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                        <div className="layout-column justify-content-start align-items-center handle">
                                            <i className={this.getClasses('marker', index)}>{this.isLast(index) ? 'room' : 'radio_button_checked'}</i>
                                            <i className={this.getClasses('dots', index)}>more_vert</i>
                                        </div>
                                        <div className="location-name">
                                            <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                        </div>
                                        <div>
                                            {
                                                index !== 0 ? 
                                                <button 
                                                className="icon-only small mx-0" 
                                                data-testid="up-button"
                                                onClick={ (e) => this.navUp(index) }>
                                                    <i className="material-icons">arrow_upward</i>
                                                </button>
                                                : ''
                                            }
                                            
                                            { !this.isLast(index) ? 
                                                <button 
                                                className="icon-only small mx-0" 
                                                data-testid="down-button"
                                                onClick={ (e) => this.navDown(index) }>
                                                    <i className="material-icons">arrow_downward</i>
                                                </button>
                                                : ''
                                            }
                                           
                                        </div>
                                    </li>
                                        )
                                    }
                                )}
                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map"/>
                    </section>
                </div>

            </div>
        );
    }
}
