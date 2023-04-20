/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React, { useState } from 'react';
import ProductList from './ProductList';

const baseURL= 'http://localhost:3035';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            // isLoading to see if the data is loading
            isLoading: false,
            // the search results will be stored in the results array
            results: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    async onSearch(e) {
        
        // Start Here
        // if there is no search string don't display any items
        const {target:{value}} = e
        if(value !== null && value !== "") {
            this.setState({isLoading: true})
            try {

                fetch(`${baseURL}/api/search?q=${value}`)
                  .then(response => response.json())
                  .then(data => {
                    this.setState({ isLoading: false, showingSearch: true, results: data });
                  })
                  .catch(error => {
                    this.setState({isLoading: false})
                    console.error(error)})

              } catch (error) {
                console.error(error);
              }
        }
        else {
            this.setState({ isLoading: false, showingSearch: true, results: [] });
        }

    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {this.state.isLoading && "Data is loading.."}
                    {this.state.showingSearch && this.state.results
                        && <ProductList items={this.state.results} />}
                </div>
            </header>
        );
    }


}

// Export out the React Component
export default Menu;
