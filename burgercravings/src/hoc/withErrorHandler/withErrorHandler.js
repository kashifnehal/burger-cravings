import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        // constructor() {
        //     super()
        //     this.state = {
        //         error:null
        //     }
        //     axios.interceptors.request.use(req => {
        //         this.setState({error:null})
        //         return req;
        //     })
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error:error})
        //     })
        // }
        state = {
            error: null
        }

        // we changed componentDidMonut to componentWillMount to render whenever website is called 
        // when componentWillMount will not support we can use "constructor" works same as it 
        // will also load at the time of website starts...SEE ABOVE HAVE CODED MYSELF
        componentWillMount () {
            
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
        }
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }
        render () {
            return (
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

