import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default class ShortenUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalUrl: '',
            alertType: 'info',
            alertMessage: '',
            showAlert: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ originalUrl: event.target.value });
    }

    async handleClick() {
        try {
            const result = (await axios.post('https://url-shortener-be.herokuapp.com/api/shortens/url', {
                originalUrl: this.state.originalUrl,
            })).data;

            let alertType, alertMessage;

            if (result.errors) {
                alertType = 'error';
                alertMessage = result.errors[0].message;
            }
            else {

                alertType = 'success';
                alertMessage = <Typography component="span">
                    Your short URL is
                    <Link href={result.data.createShortenedUrl.shortUrl} variant="body2">
                        {' ' + result.data.createShortenedUrl.shortUrl}
                    </Link>
                </Typography>;
            }

            this.setState((state) => {
                return {
                    alertType: alertType,
                    alertMessage: alertMessage,
                    showAlert: true

                };
            });
        } catch (error) {
            this.setState((state) => {
                return {
                    alertType: 'error',
                    alertMessage: 'Invalid URL',
                    showAlert: true
                };
            });
        }
    }

    render() {
        return (
            <Box>{this.state.showAlert ? <Alert severity={this.state.alertType}>{this.state.alertMessage}</Alert> : ''}
                <TextField size="small" id="outlined-basic" label="Long URL" variant="outlined" fullWidth={true} margin="normal"
                    value={this.state.originalUrl} onChange={this.handleChange} error={this.state.hasError} />
                <Button variant="contained" color="primary"
                    onClick={this.handleClick}>
                    Shorten!
                    </Button>
            </Box>
        );
    }
}