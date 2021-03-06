import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        isOpen: false
      }
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  openModal = () => {
    this.setState({
      isOpen: true
    });
  };
  
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div className="sidebar">
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Reindirizzamento</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
              <p>Stai per essere renidirizzato nell'applicazione Metabase.</p>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Chiudi
              </button>
              <a href={'http://metabase.default.svc.cluster.local:3000'}>
                <button className='btn btn-default'>
                  Vai a Metabase
                </button>
              </a>
            </ModalFooter>
          </form>
        </Modal>
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/home'} className="nav-link" activeClassName="active"><i className="icon-home"></i> Home</NavLink>
            </li>
            <li className="nav-title">
              Azioni
            </li>
            <li className={this.activeRoute("/components")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Dataset</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/ingestionwizzard'} className="nav-link" activeClassName="active">  Carica</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/social-buttons'} className="nav-link" activeClassName="active"> Monitora</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/icons")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Standards</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/ontologies/list'} className="nav-link" activeClassName="active"> Ontologie</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/icons/simple-line-icons'} className="nav-link" activeClassName="active"> Vocabolari</NavLink>
                </li>
              </ul>
            </li>
        
            <li className="nav-item">
              <NavLink to={'/dashboard/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Dashboard</NavLink>
            </li>
                
            <li className="nav-item">
              <NavLink to={'/user_story/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Storie</NavLink>
            </li>

            <li className="nav-item">
              <a href='#' onClick={this.openModal} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Grafici</a>
            </li>
            <li className="nav-item">
              <a href='#' onClick={this.openModal} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Busness Intelligence</a>
            </li>
            <li className="nav-item">
              <a href='#' onClick={this.openModal} className="nav-link" /* activeClassName="active" */><i className="icon-pie-chart"></i> Data Science</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
