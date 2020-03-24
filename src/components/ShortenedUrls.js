import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

export default class ShortenedUrls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.loadData(this.state.page);
        document.addEventListener('scroll', this.handleScroll);
    }


    handleClick() {
        console.log('click');
    }

    async loadData(page) {
        try {
            const urls = (await axios.get('https://url-shortener-be.herokuapp.com/api/shortens/')).data;
            this.setState((state) => {
                return {
                    rows: urls.data.shortenedUrls,
                };
            });
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Original URL</TableCell>
                            <TableCell align="left">Created</TableCell>
                            <TableCell align="left">Short URL</TableCell>
                            <TableCell align="left">Clicks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Link href={row.originalUrl} variant="body2">
                                        {row.originalUrl}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{row.createdAt}</TableCell>
                                <TableCell align="left">
                                    <a href={row.shortUrl} variant="body2">
                                        {row.shortUrl}
                                    </a>
                                </TableCell>
                                <TableCell align="left"> {row.clicks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}